import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Cookies from 'Utilities/Cookies'
import Fetcher from 'Drivers/Fetcher'
import JwtValidator from 'Utilities/JwtValidator'
import ResetPasswordPresenter from './ResetPasswordPresenter'

type State = {
  username: string
  newPassword: string
  confirmPassword: string
  invalidFormMessage: string
}

const resetPasswordPresenter = new ResetPasswordPresenter(new Fetcher())
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

class ResetPassword extends Component<RouteComponentProps, State> {
  state = {
    username: '',
    newPassword: '',
    confirmPassword: '',
    invalidFormMessage: ''
  }

  render(): ReactElement {
    const { username, newPassword, confirmPassword, invalidFormMessage } = this.state
    const token: string | null = new URLSearchParams(this.props.location.search).get('token')
    if (!JwtValidator.validate(token)) {
      this.props.history.replace('/login')
    }
    Cookies.set('auth', JSON.stringify(token), { expires: 1 })

    return (
      <div id='password-reset'>
        <h1>Reset Password</h1>
        <h4>Please enter and confirm your new password below.</h4>
        <div id='reset-password-content'>
          <form onSubmit={this.submitForm}>
            <p>Username</p>
            <input
              type='text'
              value={username}
              onChange={(e) => this.updateInputField(e, 'username')}
              required={true}
            />
            <p>New Password</p>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => this.updateInputField(e, 'newPassword')}
              required={true}
            />
            <p>Confirm Password</p>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => this.updateInputField(e, 'confirmPassword')}
              required={true}
            />
            <div>
              <input type='submit' value='Reset password' />
            </div>
          </form>
          <p>{invalidFormMessage}</p>
        </div>
      </div>
    )
  }

  updateInputField = (event: ChangeEvent<HTMLInputElement>, key: string): void => {
    const target = event.target
    this.setState({
      ...this.state,
      [key]: target.value
    })
  }

  submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!this.state.newPassword.match(strongRegex)) {
      this.setState({
        invalidFormMessage:
          'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
      })
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ invalidFormMessage: 'Passwords must match' })
    } else {
      const response = await resetPasswordPresenter.resetPassword({
        username: this.state.username,
        password: this.state.newPassword
      })
      if (response.errorType) {
        this.setState({ invalidFormMessage: response.message })
        Cookies.remove('auth')
      } else {
        await resetPasswordPresenter.logout()
        Cookies.remove('auth')
        this.props.history.replace('/login')
      }
    }
  }
}

export default withRouter(ResetPassword)
