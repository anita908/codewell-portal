import IAssignmentVideo from 'Routes/Home/Interfaces/IAssignmentVideo'

interface IAssignmentDataStore {
  getVideosByHomeworkId(homeworkId: number): Promise<IAssignmentVideo[]>
  videos: IAssignmentVideo[]
}

export default IAssignmentDataStore
