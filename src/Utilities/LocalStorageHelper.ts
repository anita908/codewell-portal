class LocalStorageHelper {
  public static getUserFirstName(): string {
    const localStorageUsername = localStorage.getItem('firstname')

    if (localStorageUsername) {
      return localStorageUsername
    }

    return ''
  }

  public static getCurrentSessionId(): number {
    const selectedSessionId = localStorage.getItem('selectedSessionId')

    if (selectedSessionId) {
      return parseInt(selectedSessionId, 10)
    }

    return -1
  }
}

export default LocalStorageHelper
