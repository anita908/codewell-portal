import homeDataStore from 'Model/HomeDataStore'
import IChapterGradesModel from './Interfaces/IChapterGradesModel'
import IChapterProgress from 'Routes/Home/Interfaces/IChapterProgress'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IGradesPresenter from './IGradesPresenter'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'

class GradesPresenter implements IGradesPresenter {
  private readonly fetcher: IFetcher
  private readonly homeDataStore: IHomeDataStore = homeDataStore

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getSessionGradesModel(): Promise<IChapterGradesModel[]> {
    if (this.homeDataStore.home.selectedSession.sessionProgressModel.length === 0) {
      await this.homeDataStore.syncHomeData(this.fetcher, true)
    }

    return this.homeDataStore.home.selectedSession.sessionProgressModel.map(
      (chapterProgress: IChapterProgress) => {
        return {
          ...chapterProgress,
          showHomeworkProgress: false
        }
      }
    )
  }

  public async getOverallGrade(): Promise<number> {
    if (this.homeDataStore.home.selectedSession.overallGrade === -1) {
      await this.homeDataStore.syncHomeData(this.fetcher, true)
    }
    return this.homeDataStore.home.selectedSession.overallGrade
  }
}

export default GradesPresenter
