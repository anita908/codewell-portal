import { allStudents, taughtSessions } from 'Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IAdminSession from './Interfaces/IAdminSession'
import IStudent from './Interfaces/IStudent'

class StudentsPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getTaughtSessions(): Promise<IAdminSession[]> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: taughtSessions
    })
    if (response.errorType) {
      return []
    } else {
      return response
    }
  }

  public async getStudentsInSession(sessionId: number): Promise<IStudent[]> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${allStudents}?sessionId=${sessionId}`
    })
    if (response.errorType) {
      return []
    } else {
      return response
    }
  }
}

export default StudentsPresenter
