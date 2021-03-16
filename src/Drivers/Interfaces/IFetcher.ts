interface IFetcher {
  fetch(params: { body: object; method: string; url: string }, token?: string): Promise<any>
}

export default IFetcher
