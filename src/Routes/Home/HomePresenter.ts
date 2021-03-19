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

  public getCourseIds(): number[] {
    console.log(this._courseIds)

    return this._courseIds
  }

  private setCourseIds(courseId: number): void {
    this._courseIds.push(courseId)
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
      console.log('response ', response)
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

      this._sessions = enrolledSessions
      this._lessons = enrolledSessions[0].sessionProgressModel // TODO

      enrolledSessions.forEach((session: ISession) => {
        console.log('session ', session)
        this.setCourseIds(session.courseId)
      })
    }
  }
}

export default HomePresenter
