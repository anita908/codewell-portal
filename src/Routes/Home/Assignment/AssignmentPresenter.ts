import assignmentDataStore from 'Model/AssignmentDataStore'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import ISubscriber from 'UseCases/ISubscriber'

class AssignmentPresenter implements IAssignmentPresenter {
  private subscribers: ISubscriber[]

  constructor(private readonly assignmentDataStore: any) {
    this.subscribers = []
  }

  getHomeworkVideosByLessonId(lessonId: number): IAssignmentVideo[] {
    return this.assignmentDataStore.getVideosByLessonId(lessonId)
  }

  public getVideos(): IAssignmentVideo[] {
    return assignmentDataStore.videos
  }

  public subscribe(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber)
  }

  public update(): void {
    this.subscribers.forEach((subscriber) => subscriber.update())
  }

  public async getHomeworkVideosByCourseId(
    courseId: number,
    fetcher: IFetcher
  ): Promise<IAssignmentVideo[]> {
    return assignmentDataStore.getAssignmentInstructionVideosByCourseId(courseId, fetcher)
  }
}

export default AssignmentPresenter
