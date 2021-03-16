import ISession from './ISession'
import IUserData from './IUserData'

interface IHomeData {
  enrolledSessions: ISession[]
  userData: IUserData
}

export default IHomeData
