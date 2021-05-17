import { uploadAssignmentFile, uploadAssignmentUrl } from '../../Utilities/Url'
import Fetcher from 'Drivers/Fetcher'
import homeDataStore from 'Model/HomeDataStore'
import IChapterGradesModel from './Interfaces/IChapterGradesModel'
import IChapterProgress from 'Routes/Home/Interfaces/IChapterProgress'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'

class UploadAssignmentPresenter {
  constructor(private readonly fetcher: IFetcher) {}
  private readonly homeDataStore: IHomeDataStore = homeDataStore

  public async uploadAssignmentLink(
    homeworkId: number,
    sessionId: number,
    assignmentUrl: string
  ): Promise<any> {
    return await this.fetcher.fetch({
      body: {},
      method: 'PUT',
      url: `${uploadAssignmentUrl}?homeworkId=${homeworkId}&sessionId=${sessionId}&url=${assignmentUrl}`
    })
  }

  public async uploadAssignmentFile(
    homeworkId: number,
    sessionId: number,
    assignmentFile: File
  ): Promise<any> {
    const formData = new FormData()
    formData.append('file', assignmentFile)
    return await this.fetcher
      .method('PUT')
      .url(uploadAssignmentFile)
      .queryParams({
        homeworkId,
        sessionId
      })
      .body(formData)
      .execute()
  }

  public async getSessionGradesModel(): Promise<IChapterGradesModel[]> {
    if (this.homeDataStore.home.selectedSession.sessionProgressModel.length === 0) {
      await this.homeDataStore.syncHomeData(this.fetcher, true)
    }

    return this.homeDataStore.home.selectedSession.sessionProgressModel.map(
      (chapterProgress: IChapterProgress) => {
        return {
          ...chapterProgress,
          showHomeworkProgress: false
        }
      }
    )
  }
}

export default UploadAssignmentPresenter
