import { homeworkVideo, homeworkVideoByCourseId } from '../../../Utilities/Url'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import IFetcher from '../../../Drivers/Interfaces/IFetcher'

class AssignmentPresenter implements IAssignmentPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getHomeworkVideos(homeworkId: number): Promise<IAssignmentVideo[]> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${homeworkVideo}${homeworkId}`
    })

    if (response && response.length) {
      return response
    }

    return []
  }

  public async getHomeworkVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${homeworkVideoByCourseId}${courseId}`
    })

    if (response && response.length) {
      return response
    }

    return []
  }
}

export default AssignmentPresenter
