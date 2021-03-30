class LocalStorageHelper {
  public static getUserFirstName(): string {
    const localStorageUsername = localStorage.getItem('firstname')

    if (localStorageUsername) {
      return localStorageUsername
    }

    return ''
  }
}

export default LocalStorageHelper
