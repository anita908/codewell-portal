import { getLearningProgress } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ICourseSlidesPresenter from './ICourseSlidesPresenter'

class CourseSlidesPresenter implements ICourseSlidesPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getCourseSlides(): Promise<object> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: getLearningProgress
    })
    return response
  }
}

export default CourseSlidesPresenter
