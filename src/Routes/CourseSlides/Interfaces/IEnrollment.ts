import ISession from './ISession'

interface IEnrollment {
  id: number
  session: ISession
  userId: string
  enrollDate: string
  graduated: string
  overallGrade: number
}

export default IEnrollment
