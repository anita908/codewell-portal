import IAssignmentVideo from 'Routes/Home/Interfaces/IAssignmentVideo'

interface IAssignmentDataStore {
  getAssignmentInstructionVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]>
  getVideosByLessonId(lessonId: number): IAssignmentVideo[]
  videos: IAssignmentVideo[]
}

export default IAssignmentDataStore
