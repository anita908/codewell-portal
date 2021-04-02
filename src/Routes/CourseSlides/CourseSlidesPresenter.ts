import IChapter from './Interfaces/IChapter'
import ICourseSlideDataStore from 'Model/Interfaces/ICourseSlideDataStore'

class CourseSlidesPresenter {
  private readonly courseSlidesStore: ICourseSlideDataStore

  constructor(courseSlidesStore: ICourseSlideDataStore) {
    this.courseSlidesStore = courseSlidesStore
  }

  public async getCourseSlides(): Promise<IChapter[]> {
    return this.courseSlidesStore.getCourseSlides()
  }
}

export default CourseSlidesPresenter
