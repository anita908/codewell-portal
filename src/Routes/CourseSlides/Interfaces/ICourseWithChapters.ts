import IChapter from './IChapter'

interface ICourseWithChapters {
  id: number
  courseName: string
  chapters: IChapter[]
}

export default ICourseWithChapters
