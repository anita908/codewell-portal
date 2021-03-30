class CacheHelper {
  public static cacheRouteData = (routeName: string, data: object): void => {
    if (data === null) {
      return
    }

    localStorage.setItem(
      routeName,
      JSON.stringify({
        data,
        expiration: new Date().getTime() + CacheHelper.getCacheExpirationDate()
      })
    )
  }

  private static getCacheExpirationDate = (minutesToExpiration: number = 15): number => {
    const oneMinuteInMilliseconds = 60000
    return minutesToExpiration * oneMinuteInMilliseconds
  }

  public static getCache = (routeName: string): any => {
    const cache = localStorage.getItem(routeName)

    if (cache === null) {
      return null
    }

    return JSON.parse(cache)
  }

  public static hasValidCache = (routeName: string): boolean => {
    const cache = CacheHelper.getCache(routeName)

    if (!cache || CacheHelper.isExpired(cache.expiration)) {
      return false
    }

    if (cache.hasOwnProperty('data') && cache.data !== null) {
      return true
    }

    return false
  }

  private static isExpired = (expirationTime: number): boolean => {
    return new Date().getTime() > expirationTime
  }
}

export default CacheHelper
