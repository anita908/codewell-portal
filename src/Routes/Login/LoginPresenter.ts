import { login } from '../../Utilities/Url'
import Cookies from '../../Utilities/Cookies'
import IAuthToken from './Interfaces/IAuthToken'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class LoginPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async login(username: string, password: string): Promise<any> {
    const response = await this.fetcher.fetch({
      body: {
        username,
        password
      },
      method: 'POST',
      url: login
    })
    if (!response.errorType) {
      this.setAuthCookie(response as IAuthToken)
    }

    return response
  }

  private setAuthCookie(authToken: IAuthToken): void {
    localStorage.clear()
    Cookies.remove('adminAuth')
    Cookies.remove('auth')
    if (authToken.isAdmin) {
      Cookies.set('adminAuth', JSON.stringify(authToken.jwt), { expires: 1 })
    } else {
      Cookies.set('auth', JSON.stringify(authToken.jwt), { expires: 1 })
    }
  }
}

export default LoginPresenter
