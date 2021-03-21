import IHomeworkProgress from './IHomeworkProgress'

interface ILesson {
  activities: string[]
  chapterId: number
  chapterName: string
  chapterNo: number
  homeworkId: number
  homeworkLink: string
  homeworkName: string
  homeworkProgress: IHomeworkProgress[]
}

export default ILesson
