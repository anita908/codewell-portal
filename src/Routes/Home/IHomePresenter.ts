import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IChapterProgress from './Interfaces/IChapterProgress'
import ISession from './Interfaces/ISession'
import ISubscriber from 'UseCases/ISubscriber'

interface IHomePresenter {
  selectedSession: ISession
  enrolledSessions: ISession[]
  lessons: IChapterProgress[]
  getCourseSlides(): IChapter[]
  getHomeData(): Promise<void>
  setSelectedSession(session: ISession): void
  subscribe(subscriber: ISubscriber): void
  update(): void
}

export default IHomePresenter
