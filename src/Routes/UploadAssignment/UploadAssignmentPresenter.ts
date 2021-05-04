import { uploadAssignmentLink } from '../../Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'

class UploadAssignmentPresenter {
  constructor(private readonly fetcher: IFetcher) {}

  public async uploadAssignmentLink(params: {
    sessionId: number
    homeworkId: number
    assignmentUrl: string
  }): Promise<any> {
    const { assignmentUrl, homeworkId, sessionId } = params

    return this.fetcher.fetch({
      body: {},
      method: 'PUT',
      url: `${uploadAssignmentLink}?homeworkId=${homeworkId}&sessionId=${sessionId}&url=${assignmentUrl}`
    })
  }

  public async uploadAssignmentFile(params: {
    sessionId: number
    homeworkId: number
    assignmentFile: FileList | null
  }): Promise<any> {
    const { assignmentFile, homeworkId, sessionId } = params

    return this.fetcher.fetch({
      body: {},
      method: 'PUT',
      url: `${uploadAssignmentLink}?homeworkId=${homeworkId}&sessionId=${sessionId}&url=${assignmentFile}`
    })
  }
}

export default UploadAssignmentPresenter
