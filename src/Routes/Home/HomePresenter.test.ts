import HomePresenter from './HomePresenter'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'
import IHomePresenter from './IHomePresenter'
import ISession from './Interfaces/ISession'
import IUserData from './Interfaces/IUserData'

describe('Test home presenter', () => {
  let homePresenter: IHomePresenter
  let mockHomeDataStore: IHomeDataStore
  let courseChapters: IChapter[]
  let session: ISession
  let userData: IUserData

  beforeEach(() => {
    courseChapters = [
      {
        id: 0,
        chapterNo: 1,
        name: 'course name',
        slidesLink: 'slide link'
      }
    ]
    session = {
      beginDate: '2020-01-01',
      courseId: 1,
      courseName: 'course name 1',
      currentChapter: 2,
      endDate: '2020-05-01',
      enrollDate: '2020-06-01',
      enrollmentId: 23,
      graduated: '2020-01-01',
      overallGrade: 100.0,
      sessionId: 2,
      sessionProgressModel: [],
      withdrawn: 'false'
    }
    userData = {
      birthdate: '2000-01-01',
      city: 'Orem',
      firstName: 'Kyle',
      id: 1,
      isAdmin: 'false',
      lastName: 'Kuzma',
      state: 'UT',
      userId: '100'
    }
    mockHomeDataStore = {
      home: {
        courseChapters: courseChapters,
        enrolledSessions: [],
        lessons: [],
        selectedSession: session,
        userData
      },
      setSessionProgressModel: jest.fn(),
      setHomeData: jest.fn(),
      setUserData: jest.fn(),
      setUserFirstName: jest.fn(),
      setEnrolledSessions: jest.fn(),
      setSelectedSession: jest.fn(),
      setLessons: jest.fn(),
      setCourseChapters: jest.fn(),
      syncHomeData: jest.fn()
    }
    homePresenter = new HomePresenter(mockHomeDataStore)
  })

  it('Should return home data as received', () => {
    expect(homePresenter.selectedSession.sessionId).toBe(2)
    expect(homePresenter.enrolledSessions).toEqual([])
    expect(homePresenter.lessons).toEqual([])
    expect(homePresenter.courseSlides).toEqual(courseChapters)
  })
})
