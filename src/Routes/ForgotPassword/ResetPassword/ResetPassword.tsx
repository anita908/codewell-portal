import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import ResetPasswordPresenter from './ResetPasswordPresenter'
import Cookies from 'Utilities/Cookies'

type State = {
  username: string
  newPassword: string
  confirmPassword: string
  invalidFormMessage: string
}
type Props = {
  token: String
}

const resetPasswordPresenter = new ResetPasswordPresenter(new Fetcher())
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

class ResetPassword extends Component<Props, State> {
  state = {
    username: '',
    newPassword: '',
    confirmPassword: '',
    invalidFormMessage: ''
  }

  props = {
    token: ''
  }

  render(): ReactElement {
    const { username, newPassword, confirmPassword, invalidFormMessage } = this.state
    const { token } = this.props
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
      Cookies.set('auth', JSON.stringify(this.props.token), { expires: 1 })
      const responseMessage = await resetPasswordPresenter.resetPassword({
        username: this.state.username,
        password: this.state.newPassword
      })
      Cookies.remove('auth')
      this.setState({ invalidFormMessage: responseMessage })
      if (!responseMessage) {
        if (typeof window !== 'undefined') {
          window.location.pathname = '/login'
        }
      }
    }
  }
}

export default ResetPassword
