import { action } from 'mobx'
import { courseSlides } from '../Utilities/Url'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import ICourseSlideDataStore from './Interfaces/ICourseSlideDataStore'
import IFetcher from 'Drivers/Interfaces/IFetcher'

class CourseSlideDataStore implements ICourseSlideDataStore {
  constructor(private readonly fetcher: IFetcher) {}

  @action
  public async getCourseSlides(): Promise<IChapter[]> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: `${courseSlides}1`
    })

    return response
  }
}

export default CourseSlideDataStore
