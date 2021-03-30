import Fetcher from 'Drivers/Fetcher'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'
import IHomePresenter from './IHomePresenter'
import ISession from './Interfaces/ISession'
import ISessionProgress from './Interfaces/ISessionProgress'
import ISubscriber from 'UseCases/ISubscriber'
import IUserData from './Interfaces/IUserData'

class HomePresenter implements IHomePresenter {
  private readonly homeDataStore: IHomeDataStore
  private subscribers: ISubscriber[]

  constructor(homeDataStore: IHomeDataStore) {
    this.homeDataStore = homeDataStore
    this.subscribers = []
  }

  public get selectedSession(): ISession {
    return this.homeDataStore.home.selectedSession
  }

  public get courseId(): number {
    return this.homeDataStore.home.selectedSession.courseId
  }

  public get sessions(): ISession[] {
    return this.homeDataStore.home.enrolledSessions
  }

  public get lessons(): ISessionProgress[] {
    return this.homeDataStore.home.lessons
  }

  public get courseSlides(): IChapter[] {
    return this.homeDataStore.home.courseChapters
  }

  public async getHomeData(): Promise<void> {
    await this.homeDataStore.syncHomeData(new Fetcher())

    if (this.homeDataStore.home.userData) {
      this.setUserFirstName(this.homeDataStore.home.userData)
    }

    this.update()
  }

  private setUserFirstName(userData: IUserData): void {
    localStorage.setItem('firstname', userData.firstName)
  }

  public setSelectedSession(session: ISession): void {
    this.homeDataStore.setSelectedSession(session)
    this.homeDataStore.setCourseChapters(
      session.sessionProgressModel.map((progressModel: ISessionProgress) => {
        return {
          id: progressModel.chapterId,
          chapterNo: progressModel.chapterNo,
          name: progressModel.chapterName,
          slidesLink: progressModel.slidesLink
        }
      })
    )
  }

  public subscribe(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber)
  }

  public update(): void {
    this.subscribers.forEach((subscriber) => subscriber.update())
  }
}

export default HomePresenter
