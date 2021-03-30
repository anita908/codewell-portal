import { userData, updateUser } from 'Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ISettings from './Interfaces/ISettings'
import ISettingsPresenter from './ISettingsPresenter'

class SettingsPresenter implements ISettingsPresenter {
  private readonly fetcher: IFetcher
  private _settings: ISettings

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
    this._settings = {
      email: '',
      firstName: '',
      lastName: '',
      age: null,
      city: ''
    }
  }

  public get settings(): ISettings {
    return this._settings
  }

  public async getUserSettings(): Promise<void> {
    this._settings = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: userData
    })
  }

  public async updateUserSettings(newSettings: ISettings): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default SettingsPresenter
