import ILesson from './ILesson'

interface ISession {
  beginDate: string
  courseId: number
  courseName: string
  endDate: string
  enrollDate: string
  enrollmentId: number
  graduated: boolean
  overallGrade: number
  sessionId: number
  sessionProgressModel: ILesson[]
}

export default ISession
