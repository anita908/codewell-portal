import Fetcher from 'Drivers/Fetcher'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IHomePresenter from './IHomePresenter'
import ISession from './Interfaces/ISession'
import ISessionProgress from './Interfaces/ISessionProgress'
import ISubscriber from 'UseCases/ISubscriber'
import IUserData from './Interfaces/IUserData'

class HomePresenter implements IHomePresenter {
  private subscribers: ISubscriber[]

  constructor(private readonly homeDataStore: any) {
    this.subscribers = []
  }

  public subscribe(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber)
  }

  public update(): void {
    this.subscribers.forEach((subscriber) => subscriber.update())
  }

  public get currentSession(): ISession {
    return this.homeDataStore.home.currentSession
  }

  public get sessionIds(): number[] {
    return this.homeDataStore.home.allSessions.map((session: ISession) => session.sessionId)
  }

  public get courseId(): number {
    return this.homeDataStore.home.courseId
  }

  public get sessions(): ISession[] {
    return this.homeDataStore.home.allSessions
  }

  public get lessons(): ISessionProgress[] {
    return this.homeDataStore.home.lessons
  }

  public get courseSlides(): IChapter[] {
    return this.homeDataStore.home.courseSlides
  }

  public async getHomeData(): Promise<void> {
    const response = await this.homeDataStore.getHomeData(new Fetcher())

    if (response) {
      if (response.userData) {
        this.setUserFirstName(response.userData)
      }

      if (response.enrolledSessions) {
        const { enrolledSessions } = response
        this.homeDataStore.home.allSessions = enrolledSessions
        this.setSessionIds(enrolledSessions)

        if (enrolledSessions.length === 1) {
          this.setCurrentSession(response.enrolledSessions[0].sessionId)
        }
      }
    }

    this.update()
  }

  private setUserFirstName(userData: IUserData): void {
    localStorage.setItem('firstname', userData.firstName)
  }

  private setSessionIds(sessions: ISession[]): void {
    const sessionIds: number[] = []

    sessions.forEach((session: ISession) => {
      sessionIds.push(session.sessionId)
    })

    this.homeDataStore.home.allSessionIds = sessionIds
  }

  public setCurrentSession(sessionId: number): void {
    const currentSession = this.homeDataStore.home.allSessions.find(
      (session: ISession) => session.sessionId === sessionId
    ) as ISession

    this.homeDataStore.setCurrentSession(currentSession)
    this.homeDataStore.setCourseId(currentSession.courseId)
    this.homeDataStore.setCourseSlides(currentSession)
  }
}

export default HomePresenter
