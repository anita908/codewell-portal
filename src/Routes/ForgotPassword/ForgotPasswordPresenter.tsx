import { sendEmail } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class ForgotPasswordPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async resetPassword(email: string): Promise<any> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'POST',
      url: sendEmail + email + `?local=${process.env.NODE_ENV === 'development' ? 'true' : 'false'}`
    })
    return response
  }
}

export default ForgotPasswordPresenter
