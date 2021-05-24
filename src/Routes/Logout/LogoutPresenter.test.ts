import IFetcher from '../../Drivers/Interfaces/IFetcher'
import ILogoutPresenter from './ILogoutPresenter'
import LogoutPresenter from './LogoutPresenter'

describe('Test logout presenter', () => {
  let username: string
  let fetcher: IFetcher
  let presenter: ILogoutPresenter
  beforeEach(() => {
    username = 'username'
    fetcher = {
      ...fetcher,
      fetch: jest.fn()
    }
  })

  it('Should be able to call logout', async () => {
    presenter = new LogoutPresenter(fetcher)
    await presenter.logout(username)
    expect(fetcher.fetch).toHaveBeenCalled()
  })
})
