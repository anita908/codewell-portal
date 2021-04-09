import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import Footer from '../../../Common/Footer/Footer'
import SideNav from '../../../Common/SideNav/SideNav'
import UpdatePasswordPresenter from './UpdatePasswordPresenter'
import './style.css'

type State = {
  username: string
  newPassword: string
  confirmPassword: string
  invalidFormMessage: string
  isLoading: boolean
}

const updatePasswordPresenter = new UpdatePasswordPresenter(new Fetcher())
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

class UpdatePassword extends Component<{}, State> {
  state = {
    username: '',
    newPassword: '',
    confirmPassword: '',
    invalidFormMessage: '',
    isLoading: false
  }

  render(): ReactElement {
    const { username, newPassword, confirmPassword, invalidFormMessage, isLoading } = this.state
    return (
      <div id='updatePassword'>
        <SideNav />
        <h1>Reset Password</h1>
        <h4>Please enter and confirm your new password below.</h4>
        <div className='updatePassword-back'>
          <button className='back' onClick={this.back} type='button'>
            Back
          </button>
        </div>
        <div className='updatePassword-content'>
          <form onSubmit={this.submitForm}>
            <label htmlFor='username' className='inputLabel'>
              Username:
            </label>
            <div className='inputWrapper'>
              <input
                className='input'
                onChange={(e) => this.updateInputField(e, 'username')}
                required={true}
                type='text'
                value={username}
              />
            </div>
            <label htmlFor='password' className='inputLabel'>
              New Password:
            </label>
            <div className='inputWrapper'>
              <input
                className='input'
                onChange={(e) => this.updateInputField(e, 'newPassword')}
                required={true}
                type='password'
                value={newPassword}
              />
            </div>
            <label htmlFor='confirmPassword' className='inputLabel'>
              Confirm Password:
            </label>
            <div className='inputWrapper'>
              <input
                className='input'
                onChange={(e) => this.updateInputField(e, 'confirmPassword')}
                required={true}
                type='password'
                value={confirmPassword}
              />
            </div>
            <div>
              <button className='button updatePassword-reset' type='submit' disabled={isLoading}>
                Reset Password
              </button>
            </div>
          </form>
          <p>{invalidFormMessage}</p>
        </div>
        <Footer />
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
      this.setState({ isLoading: true })
      const responseMessage = await updatePasswordPresenter.updateUserPassword({
        username: this.state.username,
        password: this.state.newPassword
      })
      this.setState({ invalidFormMessage: responseMessage, isLoading: false })
      if (!responseMessage) {
        window.location.pathname = '/settings'
      }
    }
  }

  back = (): void => {
    window.history.back()
  }
}

export default UpdatePassword
