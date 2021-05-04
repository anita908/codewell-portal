import IAssignmentVideo from '../Interfaces/IAssignmentVideo'

interface IAssignmentPresenter {
  getHomeworkVideosByHomeworkId(homeworkId: number): Promise<IAssignmentVideo[]>
  getVideos(): IAssignmentVideo[]
}

export default IAssignmentPresenter
