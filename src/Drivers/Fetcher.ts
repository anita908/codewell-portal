import Cookies from '../Utilities/Cookies'
import IFetcher from './Interfaces/IFetcher'

class Fetcher implements IFetcher {
  public static APPLICATION_JSON = 'application/json'
  public static MULTIPART_FORM_DATA = 'multipart/form-data'

  private _method: string
  private _headers: object
  private _queryParams: object
  private _url: string
  private _body: object | FormData

  constructor() {
    this._method = 'GET'
    this._headers = {}
    this._queryParams = {}
    this._url = ''
    this._body = {}
  }

  public method(method: string): IFetcher {
    this._method = method
    return this
  }

  public headers(headers: object): IFetcher {
    this._headers = headers
    return this
  }

  public url(url: string): IFetcher {
    this._url = url
    return this
  }

  public queryParams(queryParams: object): IFetcher {
    this._queryParams = queryParams
    return this
  }

  public body(body: object | FormData): IFetcher {
    this._body = body
    return this
  }

  public async execute(): Promise<any> {
    let urlWithQueryParams = '' + this._url

    if (Object.keys(this._queryParams).length > 0) {
      urlWithQueryParams += '?'
      const entries = Object.entries(this._queryParams)
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i]
        if (i > 0) {
          urlWithQueryParams += '&'
        }
        urlWithQueryParams += `${key}=${value}`
      }
    }

    const headersCopy = JSON.parse(JSON.stringify(this._headers))
    headersCopy.Authorization = `Bearer ${Cookies.get('auth') || Cookies.get('adminAuth')}`

    const request = {
      method: this._method,
      headers: headersCopy,
      body:
        headersCopy['Content-Type'] === Fetcher.APPLICATION_JSON
          ? JSON.stringify(this._body)
          : this._body
    }
    const result = await fetch(urlWithQueryParams, request as RequestInit)
    if (result) {
      const responseBody = await result.text()
      return responseBody ? JSON.parse(responseBody) : {}
    }
    return null
  }

  public async fetch(params: { body: any; method: string; url: string }): Promise<any> {
    const { body, method, url } = params
    const token = Cookies.get('auth') || Cookies.get('adminAuth')
    const headers = url.includes('login')
      ? {
          Authorization: '',
          'Content-Type': Fetcher.APPLICATION_JSON
        }
      : {
          Authorization: `Bearer ${token}`,
          'Content-Type': Fetcher.APPLICATION_JSON
        }

    const result = await fetch(url, {
      method,
      headers,
      body: method === 'GET' ? undefined : JSON.stringify(body)
    })

    if (result) {
      const responseBody = await result.text()
      return responseBody ? JSON.parse(responseBody) : {}
    }

    return null
  }
}

export default Fetcher
