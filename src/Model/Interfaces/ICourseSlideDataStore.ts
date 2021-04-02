import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'

interface ICourseSlideDataStore {
  getCourseSlides(): Promise<IChapter[]>
}

export default ICourseSlideDataStore
