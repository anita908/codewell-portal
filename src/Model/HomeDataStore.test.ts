import { mockHomeData, mockHomeDataWithOneSession } from '../Routes/Home/MockHomeData'
import HomeDataStore from './HomeDataStore'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeDataStore from './Interfaces/IHomeDataStore'

describe('Test home data store', () => {
  let fetcher: IFetcher
  let homeDataStore: IHomeDataStore
  beforeEach(() => {
    fetcher = {
      fetch: jest.fn()
    }
  })

  it('Should have default home data', () => {
    homeDataStore = new HomeDataStore(fetcher)

    expect(homeDataStore.home.courseChapters).toEqual([])
    expect(homeDataStore.home.enrolledSessions).toEqual([])
    expect(homeDataStore.home.lessons).toEqual([])
    expect(homeDataStore.home.selectedSession).toBeTruthy()
    expect(homeDataStore.home.userData).toBeTruthy()
  })

  it('Should be able to get home data', async () => {
    homeDataStore = new HomeDataStore(fetcher)

    await homeDataStore.getHomeData()
    expect(fetcher.fetch).toHaveBeenCalled()
  })

  it('Should be able to set home data', async () => {
    homeDataStore = new HomeDataStore(fetcher)
    fetcher.fetch = jest.fn().mockReturnValue(mockHomeData)

    // @ts-ignore
    homeDataStore.getSelectedSessionIdFromLocalStorage = jest.fn().mockReturnValue(1)

    await homeDataStore.getHomeData()

    expect(homeDataStore.home.userData.firstName).toMatch('Sunny')
    expect(homeDataStore.home.userData.lastName).toMatch('Yang')
    expect(homeDataStore.home.enrolledSessions).toEqual(mockHomeData.enrolledSessions)
    expect(homeDataStore.home.courseChapters.length).toEqual(16)
    expect(homeDataStore.home.enrolledSessions.length).toBe(2)
  })

  it('Should be able to set course chapters', () => {
    homeDataStore = new HomeDataStore(fetcher)
    const courseChapter = [
      {
        id: 23,
        chapterNo: 1,
        name: 'chapter title',
        slidesLink: 'this is a link'
      }
    ]

    homeDataStore.setCourseChapters(courseChapter)
    expect(homeDataStore.home.courseChapters).toEqual(courseChapter)
  })

  it('Should be able to set selected session when there is only one enrolled session', async () => {
    homeDataStore = new HomeDataStore(fetcher)
    fetcher.fetch = jest.fn().mockReturnValue(mockHomeDataWithOneSession)
    homeDataStore.setSelectedSession = jest.fn()

    await homeDataStore.getHomeData()
    expect(homeDataStore.setSelectedSession).toHaveBeenCalled()
    expect(homeDataStore.home.selectedSession.sessionId).toBe(1)
  })
})
