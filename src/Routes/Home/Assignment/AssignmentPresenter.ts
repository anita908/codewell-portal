import assignmentDataStore from '../../../Model/AssignmentDataStore'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import ISubscriber from 'UseCases/ISubscriber'

class AssignmentPresenter implements IAssignmentPresenter {
  private subscribers: ISubscriber[]

  constructor(private readonly assignmentDataStore: any) {
    this.subscribers = []
  }

  public async getHomeworkVideosByHomeworkId(homeworkId: number): Promise<IAssignmentVideo[]> {
    return this.assignmentDataStore.getVideosByHomeworkId(homeworkId)
  }

  public getVideos(): IAssignmentVideo[] {
    return assignmentDataStore.videos
  }

  public subscribe(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber)
  }

  public update(): void {
    this.subscribers.forEach(subscriber => subscriber.update())
  }
}

export default AssignmentPresenter
