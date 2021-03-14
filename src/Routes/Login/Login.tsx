import React, { Component, ReactElement } from 'react'
import Fetcher from '../../Drivers/Fetcher'
import LoginPresenter from './LoginPresenter'
import loginIllustration from '../../images/login.svg'
import './style.css'

type State = {
  username: string
  password: string
}

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  render(): ReactElement {
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
          <form onSubmit={this.submit} id='login-form'>
            <div className='login-inputGroup'>
              <div className='login-username'>
                <label htmlFor='username'>User name: </label>
                <input type='text' id='username' name='username' onChange={this.updateUsername} />
              </div>
              <div className='login-password'>
                <label htmlFor='password'>Password: </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  onChange={this.updatePassword}
                />
              </div>
              <button type='submit'>Log in</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  updateUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value })
  }

  updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value })
  }

  submit = async (event: React.FormEvent): Promise<void> => {
    const { password, username } = this.state
    event.preventDefault()

    const params = {
      username: this.saferUserInput(username),
      password: this.saferUserInput(password)
    }

    await this.login(params)
  }

  saferUserInput = (value: string): string => {
    if (
      value.toLowerCase().indexOf('and') !== -1 &&
      value.indexOf('1=') !== -1 &&
      value.indexOf('--') !== -1
    ) {
      return value.replace(/1=/g, '').replace(/--/g, '')
    }

    return value
  }

  login = async (params: any) => {
    try {
      const { password, username } = params
      const loginPresenter = new LoginPresenter(new Fetcher())
      await loginPresenter.login(username, password)
    } catch (error) {
      console.log('error ', error)
    }
  }
}

export default Login
