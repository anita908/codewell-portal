class UrlHelper {
  public static isValidUrl(url: string | null | undefined): boolean {
    if (!url) {
      return false
    }
    try {
      new URL(url)
      return true
    } catch (error) {
      return false
    }
  }
}

export default UrlHelper
