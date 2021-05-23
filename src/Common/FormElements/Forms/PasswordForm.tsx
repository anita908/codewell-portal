import React, { Component, ReactElement } from 'react'

type Props = {
  confirmPassword: string
  invalidFormMessage: string
  isLoading: boolean
  newPassword: string
  submitForm(event: React.FormEvent): Promise<void>
  title: string
  updateInputField(event: React.ChangeEvent, key: string): void
  username: string
}

class PasswordForm extends Component<Props, {}> {
  render(): ReactElement {
    const {
      confirmPassword,
      invalidFormMessage,
      isLoading,
      newPassword,
      submitForm,
      title,
      updateInputField,
      username
    } = this.props

    return (
      <div className='passwordForm'>
        <h1>{title}</h1>
        <p className='error'>{invalidFormMessage}</p>
        <h4>Please enter and confirm your new password below.</h4>
        <div className='updatePassword-back'>
          {title.toLocaleLowerCase().includes('reset') && (
            <button className='back' onClick={this.back} type='button'>
              Back
            </button>
          )}
        </div>
        <div className='updatePassword-content'>
          <form onSubmit={submitForm}>
            <label htmlFor='username' className='inputLabel'>
              Username:
            </label>
            <div className='inputWrapper'>
              <input
                className='input'
                onChange={(e) => updateInputField(e, 'username')}
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
                onChange={(e) => updateInputField(e, 'newPassword')}
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
                onChange={(e) => updateInputField(e, 'confirmPassword')}
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
        </div>
      </div>
    )
  }

  back = (): void => {
    window.history.back()
  }
}

export default PasswordForm
