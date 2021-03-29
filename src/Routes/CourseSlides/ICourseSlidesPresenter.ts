import ICourseWithChapters from './Interfaces/ICourseWithChapters'

interface ICourseSlidesPresenter {
  fetchAndAssignCourseWithChapters(): Promise<void>
  courseWithChapters: ICourseWithChapters[]
}

export default ICourseSlidesPresenter
