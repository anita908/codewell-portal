import { courseSlide } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ICourseSlidesPresenter from './ICourseSlidesPresenter'

class CourseSlidesPresenter implements ICourseSlidesPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getCourseSlides(courseId: number): Promise<Array<object>> {
    const slide = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${courseSlide}${courseId}`
    })
    if (slide && slide.length) {
      return slide
    }

    return []
  }
}

export default CourseSlidesPresenter
