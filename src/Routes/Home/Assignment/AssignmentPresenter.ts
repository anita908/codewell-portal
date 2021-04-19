import assignmentDataStore from 'Model/AssignmentDataStore'
import IAssignmentPresenter from './IAssignmentPresenter'
import IAssignmentVideo from '../Interfaces/IAssignmentVideo'
import ISubscriber from 'UseCases/ISubscriber'

class AssignmentPresenter implements IAssignmentPresenter {
  private subscribers: ISubscriber[]

  constructor(private readonly assignmentDataStore: any) {
    this.subscribers = []
  }

  public async getHomeworkVideosByLessonId(
    courseId: number,
    lessonId: number
  ): Promise<IAssignmentVideo[]> {
    await this.getHomeworkVideosByCourseId(courseId)
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

  public async getHomeworkVideosByCourseId(courseId: number): Promise<IAssignmentVideo[]> {
    return assignmentDataStore.getAssignmentInstructionVideosByCourseId(courseId)
  }
}

export default AssignmentPresenter
