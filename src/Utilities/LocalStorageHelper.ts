class LocalStorageHelper {
  public static getUsername(): string {
    const localStorageUsername = localStorage.getItem('username')

    if (localStorageUsername) {
      return localStorageUsername
    }

    return ''
  }
}

export default LocalStorageHelper
