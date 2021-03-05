import React, { useEffect, useState } from 'react'
import Fetcher from '../../Drivers/Fetcher'
import LoginPresenter from './LoginPresenter'
import loginIllustration from '../../images/login.svg'
import './style.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [invalidLogin, setInvalidLogin] = useState(false)

  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const loginPresenter = new LoginPresenter(new Fetcher())
      const response = await loginPresenter.login(username, password)
      setInvalidLogin(false)
      const { AccessToken, IdToken } = response.data.AuthenticationResult
      // saveCredentials(AccessToken, IdToken)
      // dispatch({
      //   accessToken: AccessToken,
      //   idToken: IdToken
      // })
    } catch (error) {
      console.log('error ', error)
    }
  }

  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [invalidLogin])

  return (
    <div id='login'>
      <div className='login-illustration'>
        <div className='login-image'>
          <h1>Codewell Learning</h1>
          <h2>Student Portal</h2>
          <img alt='login' className='login' src={loginIllustration} />
        </div>
      </div>
      <div className='login-input'>
        <form onSubmit={loginUser} id='login-form'>
          <div className='login-inputGroup'>
            <div className='login-username'>
              <label htmlFor='username'>User name: </label>
              <input
                type='text'
                id='username'
                name='username'
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className='login-password'>
              <label htmlFor='password'>Password: </label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type='submit'>Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
