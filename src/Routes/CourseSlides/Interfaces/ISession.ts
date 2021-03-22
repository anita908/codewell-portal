import ICourse from './ICourse'

interface ISession {
  id: number
  course: ICourse
  beginDate: string
  endDate: string
}

export default ISession
