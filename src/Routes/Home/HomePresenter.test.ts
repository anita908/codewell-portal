import HomePresenter from './HomePresenter'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'
import IHomePresenter from './IHomePresenter'
import ISession from './Interfaces/ISession'
import ISubscriber from 'UseCases/ISubscriber'
import IUserData from './Interfaces/IUserData'

describe('Test home presenter', () => {
  let anotherSubscriber: ISubscriber
  let homePresenter: IHomePresenter
  let mockHomeDataStore: IHomeDataStore
  let courseChapters: IChapter[]
  let session: ISession
  let subscriber: ISubscriber
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
      sessionProgressModel: [
        {
          activities: [],
          chapterId: 1,
          chapterName: 'chapter name',
          chapterNo: 20,
          homeworkProgress: [],
          slidesLink: 'slide link'
        }
      ],
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
    subscriber = {
      update: jest.fn()
    }
    anotherSubscriber = {
      update: jest.fn()
    }
    mockHomeDataStore = {
      home: {
        courseChapters,
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
    homePresenter.update = jest.fn()
  })

  it('Should return home data as received', async () => {
    expect(homePresenter.selectedSession.sessionId).toBe(2)
    expect(homePresenter.enrolledSessions).toEqual([])
    expect(homePresenter.lessons).toEqual([])
    expect(await homePresenter.getCourseSlides()).toBe(courseChapters)
  })

  it('Should update subscribers after fetching home data', async () => {
    await homePresenter.getHomeData()
    expect(homePresenter.update).toHaveBeenCalled()
  })

  it('Should be able to set selected session', () => {
    homePresenter.setSelectedSession(session)

    expect(mockHomeDataStore.setSelectedSession).toHaveBeenCalled()
    expect(mockHomeDataStore.setCourseChapters).toHaveBeenCalled()
    expect(mockHomeDataStore.home.selectedSession).toEqual(session)
  })

  it('Should be able to subscribe subscribers', async () => {
    homePresenter.subscribe(subscriber)
    homePresenter.subscribe(anotherSubscriber)

    // @ts-ignore
    expect(homePresenter.subscribers).toEqual([subscriber, anotherSubscriber])
  })
})
