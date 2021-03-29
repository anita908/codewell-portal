import ISessionProgress from './ISessionProgress'

interface ISession {
  beginDate: string
  courseId: number
  courseName: string
  currentChapter: number
  endDate: string
  enrollDate: string
  enrollmentId: number
  graduated: string
  overallGrade: number
  sessionId: number
  sessionProgressModel: ISessionProgress[]
}

export default ISession
