import IFetcher from './Interfaces/IFetcher'

class Fetcher implements IFetcher {
  public async fetch(
    params: { body: any; method: string; url: string },
    token: string
  ): Promise<any> {
    const { body, method, url } = params

    const result = await fetch(url, {
      method,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: method === 'GET' ? undefined : JSON.stringify(body)
    })

    if (result) {
      return result.json()
    }

    return null
  }
}

export default Fetcher
