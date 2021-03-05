import IFetcher from '../../Drivers/Interfaces/IFetcher'

class HomePresenter {
  private readonly fetcher: IFetcher
  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
  }

  public async getHomeData(): Promise<any> {
    const response = await this.fetcher.fetch({
      body: {},
      method: 'GET',
      url: 'http://localhost:5000/api/v1/user/username/johnnyataisg'
    })

    if (response) {
      return response
    }

    return null
  }
}

export default HomePresenter
