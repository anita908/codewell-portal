import IAssignmentVideo from '../Interfaces/IAssignmentVideo'

interface IAssignmentPresenter {
  getHomeworkVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]>
  getHomeworkVideosByLessonId(courseId: number, lessonId: number): Promise<IAssignmentVideo[]>
  getVideos(): IAssignmentVideo[]
}

export default IAssignmentPresenter
