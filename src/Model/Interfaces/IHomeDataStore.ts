import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeData from 'Routes/Home/Interfaces/IHomeData'
import ISession from 'Routes/Home/Interfaces/ISession'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'

interface IHomeDataStore {
  getHomeData(fetcher: IFetcher): Promise<IHomeData>
  home: {
    currentSession: ISession
    allSessions: ISession[]
    allSessionIds: number[]
    courseId: number
    sessionId: number
    lessons: ISessionProgress[]
  }
  setCourseId(courseId: number): void
  setSessionId(sessionId: number): void
  setCurrentSession(session: ISession): void
  setLessons(session: ISession): void
}

export default IHomeDataStore
