import Cookies from 'Utilities/Cookies'
import { courseSlide } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ICourseSlidesPresenter from './ICourseSlidesPresenter'

class CourseSlidesPresenter implements ICourseSlidesPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getCourseSlides(): Promise<Array<Object>> {
    const slide = await this.fetcher.fetch(
      {
        body: {},
        method: 'GET',
        url: courseSlide
      },
      Cookies.get('auth')
    )
    if (slide && slide.length) {
      return slide.enrolledSessions
    }

    return []
  }
}

export default CourseSlidesPresenter
