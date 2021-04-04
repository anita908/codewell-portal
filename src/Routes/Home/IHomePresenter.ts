import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IChapterProgress from './Interfaces/IChapterProgress'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import ISession from './Interfaces/ISession'

interface IHomePresenter {
  selectedSession: ISession
  enrolledSessions: ISession[]
  lessons: IChapterProgress[]
  courseSlides: IChapter[]
  getHomeData(fetcher: IFetcher): Promise<void>
  setSelectedSession(session: ISession): void
}

export default IHomePresenter
