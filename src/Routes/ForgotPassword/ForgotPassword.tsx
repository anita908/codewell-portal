import React, { Component, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import ForgotPasswordPresenter from './ForgotPasswordPresenter'
import './style.css'

type State = {
  email: string
  message: string
}

const forgotPasswordPresenter = new ForgotPasswordPresenter(new Fetcher())

class ForgotPassword extends Component<{}, State> {
  state = {
    email: '',
    message: ''
  }

  render(): ReactElement {
    const { message } = this.state

    return (
      <div id='forgotPassword'>
        <div className='forgotPassword-content'>
          <h1>Let's get your account back :)</h1>
          <p>{message}</p>
          <p>Please enter your email below to receive further instruction</p>
          <button className='assignmentInstruction-back' onClick={this.back} type='button'>
            Back
          </button>
          <form onSubmit={this.submit}>
            <input
              className='forgotPassword-emailInput'
              type='email'
              id='email'
              name='email'
              onChange={this.updateEmail}
            />
            <div className='forgotPassword-formControl'>
              <button className='button forgotPassword-requestButton' type='submit'>
                Request password link
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  updateEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: decodeURIComponent(event.target.value) })
  }

  submit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    const { email } = this.state
    await this.resetPassword(email)
  }

  resetPassword = async (email: any): Promise<any> => {
    const response = await forgotPasswordPresenter.resetPassword(email)
    this.setState({ message: response })
  }

  back = (): void => {
    window.history.back()
  }
}

export default ForgotPassword
