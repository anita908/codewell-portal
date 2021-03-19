import IAssignmentVideo from '../Interfaces/IAssignmentVideo'

interface IAssignmentPresenter {
  getHomeworkVideos(homeworkId: number): Promise<IAssignmentVideo[]>
  getHomeworkVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]>
}

export default IAssignmentPresenter
