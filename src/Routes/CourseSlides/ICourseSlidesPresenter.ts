import ICourseSlide from './Interfaces/ICourseSlide'

interface ICourseSlidesPresenter {
  getCourseSlides(): Promise<void>
  slides: ICourseSlide[][]
}

export default ICourseSlidesPresenter
