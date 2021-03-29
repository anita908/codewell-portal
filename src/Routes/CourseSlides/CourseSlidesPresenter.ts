import Cookies from 'Utilities/Cookies'
import { courseSlides, enrollments } from '../../Utilities/Url'
import ICourseWithChapters from './Interfaces/ICourseWithChapters'
import ICourseSlidesPresenter from './ICourseSlidesPresenter'
import IEnrollment from './Interfaces/IEnrollment'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class CourseSlidesPresenter implements ICourseSlidesPresenter {
  private _courseWithChapters: ICourseWithChapters[]

  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this._courseWithChapters = []
    this.fetcher = fetcher
  }

  public get courseWithChapters(): ICourseWithChapters[] {
    return this._courseWithChapters
  }

  public async fetchAndAssignCourseWithChapters(): Promise<void> {
    const token = Cookies.get('auth')
    const getEnrollments = await this.fetcher.fetch(
      {
        body: {},
        method: 'GET',
        url: enrollments
      },
      `Bearer ${token}`
    )

    const output: ICourseWithChapters[] = await Promise.all(
      getEnrollments.map(async (e: IEnrollment) => {
        return {
          id: e.session.course.id,
          courseName: e.session.course.name,
          chapters: await this.fetcher.fetch(
            {
              body: {},
              method: 'GET',
              url: `${courseSlides}${e.session.course.id}`
            },
            `Bearer ${token}`
          )
        }
      })
    )

    this.setCourseWithChapters(<ICourseWithChapters[]>output)
  }

  private setCourseWithChapters(courseWithChapters: ICourseWithChapters[]): void {
    this._courseWithChapters = courseWithChapters
  }
}

export default CourseSlidesPresenter
