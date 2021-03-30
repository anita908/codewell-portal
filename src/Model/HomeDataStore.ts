import { observable } from 'mobx'
import { homeData } from '../Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeData from 'Routes/Home/Interfaces/IHomeData'
import IHomeDataStore from './Interfaces/IHomeDataStore'
import ISession from 'Routes/Home/Interfaces/ISession'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'

const homeDataStore: IHomeDataStore = observable({
  getHomeData: async (fetcher: IFetcher): Promise<IHomeData> => {
    return fetcher.fetch({
      body: {},
      method: 'GET',
      url: homeData
    })
  },
  setCourseId: (courseId: number): void => {
    homeDataStore.home.courseId = courseId
  },
  setSessionId: (sessionId: number): void => {
    homeDataStore.home.sessionId = sessionId
  },
  setCurrentSession: (session: ISession): void => {
    homeDataStore.home.currentSession = session
    homeDataStore.setLessons(session)
  },
  setLessons: (session: ISession): void => {
    const { sessionProgressModel } = session
    homeDataStore.home.lessons.push(...sessionProgressModel)
  },
  home: {
    currentSession: {
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
    allSessions: [] as ISession[],
    allSessionIds: [] as number[],
    courseId: -1,
    sessionId: -1,
    lessons: [] as ISessionProgress[]
  }
})

export default homeDataStore
