import { action, observable } from 'mobx'
import { homeData } from '../Utilities/Url'
import CacheHelper from 'Utilities/CacheHelper'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeData from 'Routes/Home/Interfaces/IHomeData'
import IHomeDataStore from './Interfaces/IHomeDataStore'
import ISession from 'Routes/Home/Interfaces/ISession'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'
import IUserData from 'Routes/Home/Interfaces/IUserData'
import LocalStorageHelper from 'Utilities/LocalStorageHelper'

class HomeDataStore implements IHomeDataStore {
  @observable home = {
    courseChapters: [] as IChapter[],
    enrolledSessions: [] as ISession[],
    lessons: [] as ISessionProgress[],
    selectedSession: {
      beginDate: '',
      courseId: -1,
      courseName: '',
      currentChapter: -1,
      endDate: '',
      enrollDate: '',
      enrollmentId: -1,
      graduated: '',
      overallGrade: -1,
      sessionId: LocalStorageHelper.getCurrentSessionId() || -1,
      sessionProgressModel: []
    } as ISession,
    userData: {} as IUserData
  }

  constructor(private readonly fetcher: IFetcher) {}

  @action
  public async getHomeData(): Promise<void> {
    const routeName = 'homeData'

    if (CacheHelper.hasValidCache(routeName)) {
      this.setHomeData(CacheHelper.getCache(routeName).data)
    } else {
      const response: IHomeData = await this.fetcher.fetch({
        body: {},
        method: 'GET',
        url: homeData
      })

      if (response) {
        CacheHelper.cacheRouteData(routeName, response)
        this.setHomeData(response)
      }
    }
  }

  private setHomeData(response: IHomeData): void {
    const selectedSessionId = this.getSelectedSessionIdFromLocalStorage()

    if (response.userData) {
      this.setUserData(response.userData)
    }

    if (response.enrolledSessions) {
      this.setEnrolledSessions(response.enrolledSessions)
    }

    if (response.enrolledSessions.length === 1) {
      this.setSelectedSession(response.enrolledSessions[0])
      localStorage.setItem('selectedSessionId', response.enrolledSessions[0].sessionId.toString())
    } else if (selectedSessionId > 0) {
      const enrolledSession =
        response.enrolledSessions.find(
          (session: ISession) => session.sessionId === selectedSessionId
        ) || response.enrolledSessions[0]

      this.setSelectedSession(enrolledSession)
    }

    if (this.home.selectedSession.sessionId >= 0) {
      this.setCourseChapters(
        this.home.selectedSession.sessionProgressModel.map((progressModel: ISessionProgress) => {
          return {
            id: progressModel.chapterId,
            chapterNo: progressModel.chapterNo,
            name: progressModel.chapterName,
            slidesLink: progressModel.slidesLink
          }
        })
      )
    }
  }

  private getSelectedSessionIdFromLocalStorage(): number {
    return LocalStorageHelper.getCurrentSessionId()
  }

  private setUserData(userData: IUserData): void {
    this.home.userData = userData
    this.setUserFirstName(userData.firstName)
  }

  private setUserFirstName(firstName: string): void {
    localStorage.setItem('firstname', firstName)
  }

  private setEnrolledSessions(enrolledSessions: ISession[]): void {
    this.home.enrolledSessions = enrolledSessions
  }

  @action
  public setSelectedSession(session: ISession): void {
    this.home.selectedSession = session
    this.setLessons(session.sessionProgressModel)

    localStorage.setItem('selectedSessionId', session.sessionId.toString())
  }

  private setLessons(sessionProgresses: ISessionProgress[]): void {
    this.home.lessons = sessionProgresses
  }

  @action
  public setCourseChapters(courseChapters: IChapter[]): void {
    this.home.courseChapters = courseChapters
  }
}

export default HomeDataStore
