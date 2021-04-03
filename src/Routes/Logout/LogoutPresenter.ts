import { logout } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ILogoutPresenter from './ILogoutPresenter'

class LogoutPresenter implements ILogoutPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async logout(): Promise<void> {
    await this.fetcher.fetch({
      body: {},
      method: 'DELETE',
      url: logout
    })
  }
}

export default LogoutPresenter
