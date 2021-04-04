import jwt_decode from 'jwt-decode'

interface JWT {
  userId: string
  iss: string
  salt: string
  expirationDate: string
}

class JwtValidator {
  public static validate(token: string | null): boolean {
    if (!token) {
      return false
    }
    try {
      const decodedToken: JWT = jwt_decode(token)
      if (!decodedToken.userId) {
        return false
      } else if (!decodedToken.iss || decodedToken.iss !== 'codewell-server') {
        return false
      } else if (!decodedToken.salt) {
        return false
      } else if (!decodedToken.expirationDate) {
        return false
      } else {
        const expirationDate = Date.parse(decodedToken.expirationDate)
        if (expirationDate > Date.now()) {
          return false
        }
      }
    } catch (exception) {
      return false
    }
    return true
  }
}

export default JwtValidator
