import IActivities from 'Routes/Home/Interfaces/IActivities'
import IHomeworkProgress from 'Routes/Home/Interfaces/IHomeworkProgress'

interface IChapterGradesModel {
  activities: IActivities[]
  chapterId: number
  chapterName: string
  chapterNo: number
  homeworkProgress: IHomeworkProgress[]
  slidesLink: string
}

export default IChapterGradesModel
