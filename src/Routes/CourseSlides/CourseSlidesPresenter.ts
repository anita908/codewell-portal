import Cookies from 'Utilities/Cookies'
import { courseSlides, enrollments } from '../../Utilities/Url'
import ICourseSlide from './Interfaces/ICourseSlide'
import ICourseSlidesPresenter from './ICourseSlidesPresenter'
import IEnrollment from './Interfaces/IEnrollment'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class CourseSlidesPresenter implements ICourseSlidesPresenter {
  private _slides: ICourseSlide[][]

  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this._slides = []
    this.fetcher = fetcher
  }

  public get slides(): ICourseSlide[][] {
    return this._slides
  }

  public async getCourseSlides(): Promise<void> {
    const token = Cookies.get('auth')
    const getEnrollments = await this.fetcher.fetch(
      {
        body: {},
        method: 'GET',
        url: enrollments
      },
      `Bearer ${token}`
    )

    const slides = await Promise.all(
      getEnrollments.map((e: IEnrollment) =>
        this.fetcher.fetch(
          {
            body: {},
            method: 'GET',
            url: `${courseSlides}${e.session.course.id}`
          },
          Cookies.get('auth')
        )
      )
    )
    console.log(slides)
    this.setSlides(<ICourseSlide[][]>slides)
  }

  private setSlides(slides: ICourseSlide[][]): void {
    this._slides = slides
  }
}

export default CourseSlidesPresenter
