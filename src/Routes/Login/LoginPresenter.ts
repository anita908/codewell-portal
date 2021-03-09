import { login } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class LoginPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async login(username: string, password: string) {
    return this.fetcher.fetch(
      {
        body: {
          username,
          password
        },
        method: 'POST',
        url: ''
      },
      ''
    )
  }
}

export default LoginPresenter
