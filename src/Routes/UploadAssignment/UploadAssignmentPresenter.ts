import { uploadAssignmentFile, uploadAssignmentUrl } from '../../Utilities/Url'
import Fetcher from 'Drivers/Fetcher'
import IFetcher from 'Drivers/Interfaces/IFetcher'

class UploadAssignmentPresenter {
  constructor(private readonly fetcher: IFetcher) {}

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
}

export default UploadAssignmentPresenter
