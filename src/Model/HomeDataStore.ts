import { observable } from 'mobx'
import { homeData } from '../Utilities/Url'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeData from 'Routes/Home/Interfaces/IHomeData'
import IHomeDataStore from './Interfaces/IHomeDataStore'
import ISession from 'Routes/Home/Interfaces/ISession'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'
import IUserData from 'Routes/Home/Interfaces/IUserData'

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
      sessionId: -1,
      sessionProgressModel: []
    } as ISession,
    courseChapters: [] as IChapter[],
    lessons: [] as ISessionProgress[]
  },
  syncHomeData: async (fetcher: IFetcher): Promise<IHomeData> => {
    const userLearningModel: IHomeData = await fetcher.fetch({
      body: {},
      method: 'GET',
      url: homeData
    })
    homeDataStore.setUserData(userLearningModel.userData)
    homeDataStore.setEnrolledSessions(userLearningModel.enrolledSessions)
    const selectedSessionId = parseInt(localStorage.getItem('selectedSessionId') || '0')
    if (userLearningModel.enrolledSessions.length === 1) {
      homeDataStore.setSelectedSession(userLearningModel.enrolledSessions[0])
      localStorage.setItem(
        'selectedSessionId',
        userLearningModel.enrolledSessions[0].sessionId.toString()
      )
    } else if (selectedSessionId > 0) {
      homeDataStore.setSelectedSession(
        userLearningModel.enrolledSessions.find(
          (session: ISession) => session.sessionId === selectedSessionId
        ) || userLearningModel.enrolledSessions[0]
      )
    }
    if (homeDataStore.home.selectedSession.sessionId !== -1) {
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
    return userLearningModel
  },
  setUserData: (userData: IUserData): void => {
    homeDataStore.home.userData = userData
  },
  setEnrolledSessions: (enrolledSessions: ISession[]): void => {
    homeDataStore.home.enrolledSessions = enrolledSessions
  },
  setSelectedSession: (session: ISession): void => {
    homeDataStore.home.selectedSession = session
    homeDataStore.setLessons(session.sessionProgressModel)
  },
  setLessons: (sessionProgresses: ISessionProgress[]): void => {
    homeDataStore.home.lessons = sessionProgresses
  },
  setCourseChapters: (courseChapters: IChapter[]): void => {
    homeDataStore.home.courseChapters = courseChapters
  }
})

export default homeDataStore
