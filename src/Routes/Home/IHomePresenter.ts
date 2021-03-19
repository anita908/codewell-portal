import ILesson from './Interfaces/ILesson'
import ISession from './Interfaces/ISession'

interface IHomePresenter {
  firstName: string
  getCourseIds(): number[]
  getHomeData(): Promise<void>
  lessons: ILesson[]
  sessions: ISession[]
}

export default IHomePresenter
