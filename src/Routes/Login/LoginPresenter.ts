import { login } from '../../Utilities/Url'
import Cookies from '../../Utilities/Cookies'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class LoginPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async login(username: string, password: string): Promise<void> {
    const response = await this.fetcher.fetch({
      body: {
        username,
        password
      },
      method: 'POST',
      url: login
    })

    if (response) {
      this.setResponse(response)
    }
  }

  private setResponse(response: any): void {
    if (Object.prototype.hasOwnProperty.call(response, 'jwt')) {
      localStorage.clear()
      Cookies.set('auth', JSON.stringify(response.jwt), { expires: 1 })
      window.location.pathname = '/'
    }
  }
}

export default LoginPresenter
