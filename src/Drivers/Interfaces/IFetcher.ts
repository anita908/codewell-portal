interface IFetcher {
  fetch(params: { body: object; method: string; url: string }): Promise<any>
}

export default IFetcher
