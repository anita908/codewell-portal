import IActivities from './IActivities'
import IHomeworkProgress from './IHomeworkProgress'

interface IChapterProgress {
  activities: IActivities[]
  chapterId: number
  chapterName: string
  chapterNo: number
  homeworkProgress: IHomeworkProgress[]
  slidesLink: string
}

export default IChapterProgress
