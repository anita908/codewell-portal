import HomePresenter from './HomePresenter'
import IHomePresenter from './IHomePresenter'
import ISession from './Interfaces/ISession'
import IUserData from './Interfaces/IUserData'

describe('Test home presenter', () => {
  let homePresenter: IHomePresenter
  let mockHomeDataStore
  beforeEach(() => {
    mockHomeDataStore = {
      home: {
        courseChapters: [],
        enrolledSessions: [],
        lessons: [],
        selectedSession: {
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
        } as ISession,
        userData: {
          birthdate: '2000-01-01',
          city: 'Orem',
          firstName: 'Kyle',
          id: 1,
          isAdmin: 'false',
          lastName: 'Kuzma',
          state: 'UT',
          userId: '100'
        } as IUserData
      },
      syncHomeData: jest.fn(),
      setHomeData: jest.fn(),
      setUserData: jest.fn(),
      setUserFirstName: jest.fn(),
      setEnrolledSessions: jest.fn(),
      setSelectedSession: jest.fn(),
      setLessons: jest.fn(),
      setCourseChapters: jest.fn()
    }
    homePresenter = new HomePresenter(mockHomeDataStore)
  })

  it('Should return selected session', () => {
    const selectedSession = homePresenter.selectedSession
    expect(selectedSession.sessionId).toBe(2)
  })
})
