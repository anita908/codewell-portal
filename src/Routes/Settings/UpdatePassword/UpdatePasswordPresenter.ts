import { resetPassword } from 'Utilities/Url'
import IFetcher from 'Drivers/Interfaces/IFetcher'
import IUserCredentials from './Interfaces/IUserCredentials'
import IUpdatePasswordPresenter from './IUpdatePasswordPresenter'

class UpdatePasswordPresenter implements IUpdatePasswordPresenter {
  private readonly fetcher: IFetcher

  public constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async updateUserPassword(newCredentials: IUserCredentials): Promise<any> {
    return await this.fetcher.fetch({
      body: newCredentials,
      method: 'PUT',
      url: resetPassword
    })
  }
}

export default UpdatePasswordPresenter
