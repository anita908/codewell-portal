import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import ISession from './Interfaces/ISession'
import ISessionProgress from './Interfaces/ISessionProgress'

interface IHomePresenter {
  courseId: number
  courseSlides: IChapter[]
  selectedSession: ISession
  lessons: ISessionProgress[]
  sessions: ISession[]
  getHomeData(fetcher: IFetcher): Promise<void>
  setSelectedSession(session: ISession): void
}

export default IHomePresenter
