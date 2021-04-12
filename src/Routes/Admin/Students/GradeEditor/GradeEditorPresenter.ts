import {
  getStudentGrades,
  bulkUpdateStudentGrades,
  enrollment,
  updateEnrollment
} from 'Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IEnrollment from './Interfaces/IEnrollment'
import IGrade from './Interfaces/IGrade'

class GradeEditorPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getEnrollmentRecord(studentId: string, sessionId: number): Promise<IEnrollment> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${enrollment}?userId=${studentId}&sessionId=${sessionId}`
    })
    if (response.errorType) {
      return {} as IEnrollment
    } else {
      return response
    }
  }

  public async updateEnrollmentRecord(newEnrollmentRecord: IEnrollment): Promise<void> {
    await this.fetcher.fetch({
      body: newEnrollmentRecord,
      method: 'PUT',
      url: `${updateEnrollment}`
    })
  }

  public async getStudentGrades(studentId: string, sessionId: number): Promise<IGrade[]> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${getStudentGrades}/${studentId}?sessionId=${sessionId}`
    })
    if (response.errorType) {
      return []
    } else {
      return response
    }
  }

  public async updateStudentGrades(
    studentId: string,
    sessionId: number,
    newGrades: IGrade[]
  ): Promise<IGrade[]> {
    const response = await this.fetcher.fetch({
      body: newGrades,
      method: 'PUT',
      url: `${bulkUpdateStudentGrades}?userId=${studentId}&sessionId=${sessionId}`
    })
    if (response.errorType) {
      return []
    } else {
      return response
    }
  }
}

export default GradeEditorPresenter
