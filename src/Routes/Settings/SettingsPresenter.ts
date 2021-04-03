import { updateUser } from 'Utilities/Url'
import Fetcher from 'Drivers/Fetcher'
import IHomeDataStore from 'Model/Interfaces/IHomeDataStore'
import ISettings from './Interfaces/ISettings'
import ISettingsPresenter from './ISettingsPresenter'

class SettingsPresenter implements ISettingsPresenter {
  private readonly homeDataStore: IHomeDataStore

  constructor(homeDataStore: IHomeDataStore) {
    this.homeDataStore = homeDataStore
  }

  public async getUserSettings(): Promise<ISettings> {
    if (Object.keys(this.homeDataStore.home.userData).length === 0) {
      await this.homeDataStore.syncHomeData(new Fetcher())
    }
    return this.homeDataStore.home.userData as ISettings
  }

  public async updateUserSettings(newSettings: ISettings): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default SettingsPresenter
