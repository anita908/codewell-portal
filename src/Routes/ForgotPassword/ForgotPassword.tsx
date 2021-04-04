import React, { Component, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import ForgotPasswordPresenter from './ForgotPasswordPresenter'

type State = {
  email: string
}

class ForgotPassword extends Component<{}, State> {
  state = {
    email: ''
  }

  render(): ReactElement {
    return (
      <div id='forgotPassword'>
        <form onSubmit={this.submit}>
          <input type='email' id='email' name='email' onChange={this.updateEmail} />
          <div>
            <button className='button' type='submit'>
              Request password link
            </button>
          </div>
        </form>
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

  resetPassword = async (email: any) => {
    const forgotPasswordPresenter = new ForgotPasswordPresenter(new Fetcher())
    await forgotPasswordPresenter.resetPassword(email)
  }
}

export default ForgotPassword
