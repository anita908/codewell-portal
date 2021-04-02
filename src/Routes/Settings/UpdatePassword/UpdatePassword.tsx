import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import SideNav from 'Common/SideNav'
import UpdatePasswordPresenter from './UpdatePasswordPresenter'

type State = {
  username: string
  newPassword: string
  confirmPassword: string
  invalidFormMessage: string
}

const updatePasswordPresenter = new UpdatePasswordPresenter(new Fetcher())
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

class UpdatePassword extends Component<{}, State> {
  state = {
    username: '',
    newPassword: '',
    confirmPassword: '',
    invalidFormMessage: ''
  }

  render(): ReactElement {
    const { username, newPassword, confirmPassword, invalidFormMessage } = this.state
    return (
      <div id='password-reset'>
        <SideNav />
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
      const response = await updatePasswordPresenter.updateUserPassword({
        username: this.state.username,
        password: this.state.newPassword
      })
      if (response.errorType) {
        this.setState({ invalidFormMessage: response.message })
      } else {
        window.location.pathname = '/settings'
      }
    }
  }
}

export default UpdatePassword
