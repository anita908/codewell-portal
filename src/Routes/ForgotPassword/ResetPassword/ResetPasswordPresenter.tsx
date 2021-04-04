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
    console.log(response)
    if (response === null) {
      return 'Username is incorrect'
    }
    return 'Successfully reset password'
  }
}

export default ResetPasswordPresenter
