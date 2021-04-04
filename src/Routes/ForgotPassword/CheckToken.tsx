import React from 'react'
import { useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import ResetPassword from './ResetPassword/ResetPassword'

type JWT = {
  iss: string
  salt: string
  expirationDate: string
}

const CheckToken = () => {
  let isValid = false

  function checkIsValid(token: string): Boolean {
    try {
      jwt_decode(token)
      return true
    } catch (error) {
      console.log('invalid token format', error)
      return false
    }
  }
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const token: string = searchParams.get('token')!
  const tokenExist = checkIsValid(token)
  if (tokenExist) {
    const existToken: JWT = jwt_decode(token)
    const expirationDate = Date.parse(existToken.expirationDate)
    if (expirationDate >= Math.round(Date.now() / 1000)) {
      isValid = true
    }
  }

  return (
    <div>
      {isValid ? (
        <ResetPassword token={token} />
      ) : (
        <div>
          <p>InValid Credential</p>
        </div>
      )}
    </div>
  )
}

export default CheckToken
