import IAssignmentVideo from 'Routes/Home/Interfaces/IAssignmentVideo'
import IFetcher from 'Drivers/Interfaces/IFetcher'

interface IAssignmentDataStore {
  getAssignmentInstructionVideosByCourseId(
    courseId: number,
    fetcher: IFetcher
  ): Promise<IAssignmentVideo[]>
  getVideosByLessonId(lessonId: number): IAssignmentVideo[]
  videos: IAssignmentVideo[]
}

export default IAssignmentDataStore
