class LocalStorageHelper {
  public static getUserFirstName(): string {
    const localStorageUsername = localStorage.getItem('firstname')

    if (localStorageUsername) {
      return localStorageUsername
    }

    return ''
  }

  public static getCurrentSessionId(): number {
    const currentSessionId = localStorage.getItem('selectedSessionId')
    if (currentSessionId) {
      return parseInt('selectedSessionId', 10)
    }

    return -1
  }
}

export default LocalStorageHelper
