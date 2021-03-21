import IAssignmentVideo from '../Interfaces/IAssignmentVideo'

interface IAssignmentPresenter {
  getHomeworkVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]>
}

export default IAssignmentPresenter
