import { observable } from 'mobx'
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

const homeDataStore: IHomeDataStore = observable({
  home: {
    userData: {} as IUserData,
    enrolledSessions: [] as ISession[],
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
    courseChapters: [] as IChapter[],
    lessons: [] as ISessionProgress[]
  },
  syncHomeData: async (fetcher: IFetcher): Promise<void> => {
    const routeName = 'homeData'
    if (CacheHelper.hasValidCache(routeName)) {
      homeDataStore.setHomeData(CacheHelper.getCache(routeName).data)
    } else {
      const response: IHomeData = await fetcher.fetch({
        body: {},
        method: 'GET',
        url: homeData
      })
      if (response) {
        CacheHelper.cacheRouteData(routeName, response)
        homeDataStore.setHomeData(response)
      }
    }
  },
  setHomeData: (response: IHomeData): void => {
    const selectedSessionId = LocalStorageHelper.getCurrentSessionId()

    if (response.userData) {
      homeDataStore.setUserData(response.userData)
    }

    if (response.enrolledSessions) {
      homeDataStore.setEnrolledSessions(response.enrolledSessions)
    }

    if (response.enrolledSessions && response.enrolledSessions.length === 1) {
      homeDataStore.setSelectedSession(response.enrolledSessions[0])
      localStorage.setItem('selectedSessionId', response.enrolledSessions[0].sessionId.toString())
    } else if (selectedSessionId > 0) {
      const enrolledSession =
        response.enrolledSessions.find(
          (session: ISession) => session.sessionId === selectedSessionId
        ) || response.enrolledSessions[0]

      homeDataStore.setSelectedSession(enrolledSession)
    }

    if (homeDataStore.home.selectedSession.sessionId >= 0) {
      homeDataStore.setCourseChapters(
        homeDataStore.home.selectedSession.sessionProgressModel.map(
          (progressModel: ISessionProgress) => {
            return {
              id: progressModel.chapterId,
              chapterNo: progressModel.chapterNo,
              name: progressModel.chapterName,
              slidesLink: progressModel.slidesLink
            }
          }
        )
      )
    }
  },
  setUserData: (userData: IUserData): void => {
    homeDataStore.home.userData = userData
    homeDataStore.setUserFirstName(userData.firstName)
  },
  setUserFirstName(firstName: string): void {
    localStorage.setItem('firstname', firstName)
  },
  setEnrolledSessions: (enrolledSessions: ISession[]): void => {
    homeDataStore.home.enrolledSessions = enrolledSessions
  },
  setSelectedSession: (session: ISession): void => {
    homeDataStore.home.selectedSession = session
    homeDataStore.setLessons(session.sessionProgressModel)

    localStorage.setItem('selectedSessionId', session.sessionId.toString())
  },
  setLessons: (sessionProgresses: ISessionProgress[]): void => {
    homeDataStore.home.lessons = sessionProgresses
  },
  setCourseChapters: (courseChapters: IChapter[]): void => {
    homeDataStore.home.courseChapters = courseChapters
  }
})

export default homeDataStore
