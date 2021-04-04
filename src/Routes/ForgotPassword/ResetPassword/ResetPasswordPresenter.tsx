import { resetPassword } from '../../../Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IResetPasswordPresenter from './IResetPasswordPresenter'
import IUserCredentials from './Interface/IUserCredentials'

class ResetPasswordPresenter implements IResetPasswordPresenter {
  private readonly fetcher: IFetcher

  public constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async resetPassword(newCredentials: IUserCredentials): Promise<string> {
    const response = await this.fetcher.fetch({
      body: newCredentials,
      method: 'PUT',
      url: resetPassword
    })
    if (response.errorType === 'class java.lang.IllegalArgumentException') {
      return 'Username is incorrect'
    }
    return ''
  }
}

export default ResetPasswordPresenter
