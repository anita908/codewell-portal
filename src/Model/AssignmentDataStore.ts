import { observable } from 'mobx'
import { homeworkVideoByCourseId } from 'Utilities/Url'
import Fetcher from 'Drivers/Fetcher'
import IAssignmentDataStore from './Interfaces/IAssignmentDataStore'
import IAssignmentVideo from 'Routes/Home/Interfaces/IAssignmentVideo'
import IFetcher from 'Drivers/Interfaces/IFetcher'

const fetcher: IFetcher = new Fetcher()
const assignmentDataStore: IAssignmentDataStore = observable({
  getAssignmentInstructionVideosByCourseId: async (
    courseId: number
  ): Promise<IAssignmentVideo[]> => {
    const videos = await fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${homeworkVideoByCourseId}${courseId}`
    })

    if (videos && videos.length) {
      assignmentDataStore.videos = videos
      return videos
    }

    return []
  },
  getVideosByLessonId: (lessonId: number): IAssignmentVideo[] => {
    return assignmentDataStore.videos
      .slice()
      .filter((video: IAssignmentVideo) => video.homeworkId === lessonId)
  },
  videos: [] as IAssignmentVideo[]
})

export default assignmentDataStore
