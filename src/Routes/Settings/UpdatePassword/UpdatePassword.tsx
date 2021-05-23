import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import Footer from '../../../Common/Footer/Footer'
import PasswordForm from 'Common/FormElements/Forms/PasswordForm'
import SideNav from '../../../Common/SideNav/SideNav'
import UpdatePasswordPresenter from './UpdatePasswordPresenter'
import './style.css'

type State = {
  confirmPassword: string
  isLoading: boolean
  invalidFormMessage: string
  newPassword: string
  username: string
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
        <PasswordForm
          confirmPassword={confirmPassword}
          invalidFormMessage={invalidFormMessage}
          isLoading={isLoading}
          newPassword={newPassword}
          title={'Update Password'}
          updateInputField={this.updateInputField}
          username={username}
          submitForm={this.submitForm}
        />
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
