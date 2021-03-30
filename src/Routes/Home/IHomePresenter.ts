import IFetcher from 'Drivers/Interfaces/IFetcher'
import ISession from './Interfaces/ISession'
import ISessionProgress from './Interfaces/ISessionProgress'

interface IHomePresenter {
  courseId: number
  currentSession: ISession
  getHomeData(fetcher: IFetcher): Promise<void>
  lessons: ISessionProgress[]
  sessionIds: number[]
  sessions: ISession[]
  setCurrentSession(sessionId: number): void
}

export default IHomePresenter
