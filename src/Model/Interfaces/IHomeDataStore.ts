import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import ISession from 'Routes/Home/Interfaces/ISession'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'
import IUserData from 'Routes/Home/Interfaces/IUserData'

interface IHomeDataStore {
  home: {
    courseChapters: IChapter[]
    enrolledSessions: ISession[]
    lessons: ISessionProgress[]
    selectedSession: ISession
    userData: IUserData
  }
  getHomeData(): Promise<void>
  setCourseChapters(courseChapters: IChapter[]): void
  setSelectedSession(session: ISession): void
}

export default IHomeDataStore
