import { uploadAssignmentLink } from '../../Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'

class UploadAssignmentPresenter {
  constructor(private readonly fetcher: IFetcher) {}

  public async uploadAssignment(params: {
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
}

export default UploadAssignmentPresenter
