import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeData from 'Routes/Home/Interfaces/IHomeData'
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
  syncHomeData(fetcher: IFetcher, useCache: boolean): Promise<void>
  setCourseChapters(courseChapters: IChapter[]): void
  setEnrolledSessions(enrolledSessions: ISession[]): void
  setHomeData(response: IHomeData): void
  setLessons(session: ISessionProgress[]): void
  setSelectedSession(session: ISession): void
  setUserFirstName(firstName: string): void
  setUserData(userData: IUserData): void
}

export default IHomeDataStore
