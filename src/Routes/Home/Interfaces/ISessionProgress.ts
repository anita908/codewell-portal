import IActivities from './IActivities'
import IHomeworkProgress from './IHomeworkProgress'

interface ISessionProgress {
  activities: IActivities[]
  chapterId: number
  chapterName: string
  chapterNo: number
  homeworkProgress: IHomeworkProgress[]
  slidesLink: string
}

export default ISessionProgress
