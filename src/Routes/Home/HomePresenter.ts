import { homeData } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import IHomeData from './Interfaces/IHomeData'
import IHomePresenter from './IHomePresenter'
import ILesson from './Interfaces/ILesson'
import ISession from './Interfaces/ISession'

class HomePresenter implements IHomePresenter {
  private readonly fetcher: IFetcher
  private _firstName: string
  private _sessions: ISession[]
  private _lessons: ILesson[]
  private _courseIds: number[]

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
    this._firstName = 'user'
    this._sessions = []
    this._lessons = []
    this._courseIds = []
  }

  public get courseIds(): number[] {
    return this._courseIds
  }

  public get firstName(): string {
    return this._firstName
  }

  public get sessions(): ISession[] {
    return this._sessions
  }

  public get lessons(): ILesson[] {
    return this._lessons
  }

  public async getHomeData(): Promise<void> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: homeData
    })

    if (response) {
      this.setHomeData(response)
    }
  }

  private setHomeData(response: IHomeData): void {
    if (response.userData) {
      const { userData } = response
      this._firstName = userData.firstName
    }

    if (response.enrolledSessions) {
      const { enrolledSessions } = response

      this.setEnrolledSessions(enrolledSessions)
    }
  }

  private setEnrolledSessions(sessions: ISession[]): void {
    this._sessions = sessions

    sessions.forEach((session: ISession) => {
      this._courseIds = [...this._courseIds, session.courseId]

      session.sessionProgressModel.forEach((lesson: ILesson) => {
        this._lessons = [...this._lessons, lesson]
      })
    })
  }
}

export default HomePresenter
