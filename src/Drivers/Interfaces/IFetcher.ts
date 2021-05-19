interface IFetcher {
  method(method: string): IFetcher
  headers(headers: object): IFetcher
  url(url: string): IFetcher
  queryParams(queryParams: object): IFetcher
  body(body: object | FormData): IFetcher
  execute(): Promise<any>
  fetch(params: { body: object; method: string; url: string }, token?: string): Promise<any>
}

export default IFetcher
