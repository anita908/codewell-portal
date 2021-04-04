import { resetPassword } from '../../../Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IUserCredentials from './Interface/IUserCredentials'
import IResetPasswordPresenter from './IResetPasswordPresenter'

class ResetPasswordPresenter implements IResetPasswordPresenter {
  private readonly fetcher: IFetcher

  public constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async resetPassword(newCredentials: IUserCredentials, token: string): Promise<string> {
    console.log(token)
    const response = await this.fetcher.fetch(
      {
        body: newCredentials,
        method: 'PUT',
        url: resetPassword
      },
      `Bearer ${token}`
    )
    console.log(response)
    if (response.errorType === 'class java.lang.IllegalArgumentException') {
      return 'Username is incorrect'
    }
    return ''
  }
}

export default ResetPasswordPresenter
