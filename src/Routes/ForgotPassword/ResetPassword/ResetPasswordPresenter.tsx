import { logout, resetPassword } from '../../../Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IResetPasswordPresenter from './IResetPasswordPresenter'
import IUserCredentials from './Interface/IUserCredentials'

class ResetPasswordPresenter implements IResetPasswordPresenter {
  private readonly fetcher: IFetcher

  public constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async resetPassword(newCredentials: IUserCredentials): Promise<any> {
    return await this.fetcher.fetch({
      body: newCredentials,
      method: 'PUT',
      url: resetPassword
    })
  }

  public async logout(): Promise<void> {
    await this.fetcher.fetch({
      body: {},
      method: 'DELETE',
      url: logout
    })
  }
}

export default ResetPasswordPresenter
