import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import IFetcher from 'Drivers/Interfaces/IFetcher'

interface IAssignmentPresenter {
  getHomeworkVideosByCourseId(courseId: number, fetcher: IFetcher): Promise<IAssignmentVideo[]>
  getHomeworkVideosByLessonId(lessonId: number): IAssignmentVideo[]
  getVideos(): IAssignmentVideo[]
}

export default IAssignmentPresenter
