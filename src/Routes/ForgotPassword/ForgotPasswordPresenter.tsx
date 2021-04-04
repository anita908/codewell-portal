import { sendEmail } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

class ForgotPasswordPresenter {
  private readonly fetcher: IFetcher

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async resetPassword(email: string): Promise<void> {
    await this.fetcher.fetch({
      body: {},
      method: 'POST',
      url:
        sendEmail +
        email +
        `?local=${
          !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'true' : 'false'
        }`
    })
  }
}

export default ForgotPasswordPresenter
