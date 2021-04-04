import Cookies from '../Utilities/Cookies'
import IFetcher from './Interfaces/IFetcher'

class Fetcher implements IFetcher {
  public async fetch(params: { body: any; method: string; url: string }): Promise<any> {
    const { body, method, url } = params
    const token = Cookies.get('auth')
    const headers = url.includes('login')
      ? {
          Authorization: '',
          'Content-Type': 'application/json'
        }
      : {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }

    const result = await fetch(url, {
      method,
      headers,
      body: method === 'GET' ? undefined : JSON.stringify(body)
    })

    return result.json()
  }
}

export default Fetcher
