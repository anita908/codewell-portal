import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Cookies from 'Utilities/Cookies'
import Fetcher from 'Drivers/Fetcher'
import JwtValidator from 'Utilities/JwtValidator'
import ResetPasswordPresenter from './ResetPasswordPresenter'
import PasswordForm from 'Common/FormElements/Forms/PasswordForm'

type State = {
  confirmPassword: string
  invalidFormMessage: string
  isLoading: boolean
  newPassword: string
  username: string
}

const resetPasswordPresenter = new ResetPasswordPresenter(new Fetcher())
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')

class ResetPassword extends Component<RouteComponentProps, State> {
  state = {
    username: '',
    newPassword: '',
    confirmPassword: '',
    invalidFormMessage: '',
    isLoading: false
  }

  render(): ReactElement {
    const { username, newPassword, confirmPassword, invalidFormMessage, isLoading } = this.state
    const token: string | null = new URLSearchParams(this.props.location.search).get('token')

    if (!JwtValidator.validate(token)) {
      this.props.history.replace('/login')
    }
    Cookies.set('auth', JSON.stringify(token), { expires: 1 })

    return (
      <div id='resetPassword'>
        <PasswordForm
          confirmPassword={confirmPassword}
          invalidFormMessage={invalidFormMessage}
          isLoading={isLoading}
          newPassword={newPassword}
          submitForm={this.submitForm}
          title={'Reset Password'}
          username={username}
          updateInputField={this.updateInputField}
        />
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

      const response = await resetPasswordPresenter.resetPassword({
        username: this.state.username,
        password: this.state.newPassword
      })
      if (response.errorType) {
        this.setState({ invalidFormMessage: response.message, isLoading: false })
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
