import { homeData } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ILesson from './Interfaces/ILesson'
import ISession from './Interfaces/ISession'
import IUserData from './Interfaces/IUserData'

interface IHomeData {
  enrolledSessions: ISession[]
  userData: IUserData
}

class HomePresenter {
  private readonly fetcher: IFetcher
  private _firstName: string
  private _sessions: ISession[]
  private _lessons: ILesson[]

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
    this._firstName = ''
    this._sessions = []
    this._lessons = []
  }

  public get firstName(): string {
    return this._firstName
  }

  public get sessions(): ISession[] {
    return this._sessions
  }

  public get lessons(): ILesson[] | null {
    return this._lessons
  }

  public async getHomeData(): Promise<void> {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzYWx0IjoiNGYyYmFmZGYtMmMyNi00MjUwLTlkZDYtNGI1ZmNmYzRiN2NlIiwiaXNzIjoiY29kZXdlbGwtc2VydmVyIiwidXNlcklkIjoiNTBlZDJiZjgtY2U3MS00MWI0LWFiYzctYTEwMWRiZjlmZmI1IiwiZXhwaXJhdGlvbkRhdGUiOiIyMDIxLTAzLTE3VDE5OjE2OjQzLjMzOTc5OC0wNzowMCJ9.0DdWPd0MxQ4hdhIbgA9B-cHXNfvWhusWiAlHapQUUgM'
    const response = await this.fetcher.fetch(
      {
        body: {},
        method: 'GET',
        url: homeData
      },
      `Bearer ${token}`
    )

    if (response) {
      this.setHomeData(response)
    }
  }

  private setHomeData(response: IHomeData): void {
    const { userData, enrolledSessions } = response
    this._firstName = userData.firstName
    this._sessions = enrolledSessions
    this._lessons = enrolledSessions[0].sessionProgressModel
  }
}

export default HomePresenter
