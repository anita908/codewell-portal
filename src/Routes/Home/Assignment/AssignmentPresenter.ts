import { homeworkVideoByCourseId } from '../../../Utilities/Url'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import IFetcher from '../../../Drivers/Interfaces/IFetcher'

class AssignmentPresenter implements IAssignmentPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getHomeworkVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]> {
    const videos = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${homeworkVideoByCourseId}${courseId}`
    })

    return videos
  }
}

export default AssignmentPresenter
