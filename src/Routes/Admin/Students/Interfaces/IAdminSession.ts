import ICourse from './ICourse'

interface IAdminSession {
  id: number
  course: ICourse
  beginDate: string
  endDate: string
}

export default IAdminSession
