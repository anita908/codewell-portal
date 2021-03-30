import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeData from 'Routes/Home/Interfaces/IHomeData'
import ISession from 'Routes/Home/Interfaces/ISession'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'
import IUserData from 'Routes/Home/Interfaces/IUserData'

interface IHomeDataStore {
  home: {
    userData: IUserData
    enrolledSessions: ISession[]
    selectedSession: ISession
    courseChapters: IChapter[]
    lessons: ISessionProgress[]
  }
  syncHomeData(fetcher: IFetcher): Promise<IHomeData>
  setUserData(userData: IUserData): void
  setEnrolledSessions(enrolledSessions: ISession[]): void
  setSelectedSession(session: ISession): void
  setLessons(session: ISessionProgress[]): void
  setCourseChapters(courseChapters: IChapter[]): void
}

export default IHomeDataStore
