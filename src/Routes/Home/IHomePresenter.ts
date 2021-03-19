import ILesson from './Interfaces/ILesson'
import ISession from './Interfaces/ISession'

interface IHomePresenter {
  firstName: string
  courseIds: number[]
  getHomeData(): Promise<void>
  lessons: ILesson[]
  sessions: ISession[]
}

export default IHomePresenter
