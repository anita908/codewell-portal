import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import ISession from './Interfaces/ISession'
import ISessionProgress from './Interfaces/ISessionProgress'

interface IHomePresenter {
  courseId: number
  courseSlides: IChapter[]
  getHomeData(fetcher: IFetcher): Promise<void>
  lessons: ISessionProgress[]
  selectedSession: ISession
  sessions: ISession[]
  setSelectedSession(session: ISession): void
}

export default IHomePresenter
