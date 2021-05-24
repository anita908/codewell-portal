import { observable } from 'mobx'
import { homeworkVideo } from '../Utilities/Url'
import Fetcher from '../Drivers/Fetcher'
import IAssignmentDataStore from './Interfaces/IAssignmentDataStore'
import IAssignmentVideo from '../Routes/Home/Interfaces/IAssignmentVideo'
import IFetcher from '../Drivers/Interfaces/IFetcher'

const fetcher: IFetcher = new Fetcher()
const assignmentDataStore: IAssignmentDataStore = observable({
  getVideosByHomeworkId: async (homeworkId: number): Promise<IAssignmentVideo[]> => {
    const videos = await fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${homeworkVideo}${homeworkId}`
    })

    if (videos && videos.length) {
      assignmentDataStore.videos = videos
      return videos
    }

    return []
  },
  videos: [] as IAssignmentVideo[]
})

export default assignmentDataStore
