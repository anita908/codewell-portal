import { updatePassword } from 'Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IUserCredentials from './Interfaces/IUserCredentials'
import IUpdatePasswordPresenter from './IUpdatePasswordPresenter'

class UpdatePasswordPresenter implements IUpdatePasswordPresenter {
  private readonly fetcher: IFetcher

  public constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async updateUserPassword(newCredentials: IUserCredentials): Promise<string> {
    const response = await this.fetcher.fetch({
      body: newCredentials,
      method: 'PUT',
      url: updatePassword
    })
    if (response.errorType === 'class java.lang.IllegalArgumentException') {
      return 'Username is incorrect'
    }
    return ''
  }
}

export default UpdatePasswordPresenter
