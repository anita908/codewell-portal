import React, { Component, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Fetcher from 'Drivers/Fetcher'
import Footer from 'Common/Footer'
import homeDataStore from 'Model/HomeDataStore'
import IProfile from './Interfaces/IProfile'
import SettingsPresenter from './SettingsPresenter'
import SideNav from 'Common/SideNav'
import './style.css'

type State = {
  errorMessage: string
  formMessage: string
  successMessage: string
  userProfile: IProfile
}

const presenter = new SettingsPresenter(new Fetcher(), homeDataStore)
class Settings extends Component<{}, State> {
  state = {
    errorMessage: '',
    formMessage: '',
    successMessage: '',
    userProfile: {
      birthdate: '',
      city: '',
      state: '',
      email: '',
      firstName: '',
      lastName: ''
    }
  }

  componentDidMount(): void {
    this.getUserProfile()
  }

  render(): ReactElement {
    const { errorMessage, formMessage, successMessage, userProfile } = this.state

    return (
      <div id='settings'>
        <SideNav />
        <h1>Settings</h1>
        <Link to='/settings/resetPassword'>Change Password</Link>
        <div className='settings-content'>
          <p className='error'>{errorMessage}</p>
          <p className='success'>{successMessage}</p>
          <p>{formMessage}</p>
          <label htmlFor='firstname' className='inputLabel'>
            First Name:{' '}
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='firstname'
              onChange={(e) => this.updateInputField(e, 'firstName')}
              required={true}
              type='text'
              value={userProfile.firstName}
            />
          </div>
          <label htmlFor='lastname' className='inputLabel'>
            Last Name:{' '}
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='lastname'
              onChange={(e) => this.updateInputField(e, 'lastName')}
              required={true}
              type='text'
              value={userProfile.lastName}
            />
          </div>
          <label htmlFor='email' className='inputLabel'>
            Email Address:{' '}
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='email'
              onChange={(e) => this.updateInputField(e, 'email')}
              required={true}
              type='text'
              value={userProfile.email}
            />
          </div>
          <label htmlFor='birthdate' className='inputLabel'>
            Birthday:{' '}
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='birthdate'
              onChange={(e) => this.updateInputField(e, 'birthdate')}
              required={true}
              type='date'
              value={userProfile.birthdate}
            />
          </div>
          <label htmlFor='city' className='inputLabel'>
            City:
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='city'
              onChange={(e) => this.updateInputField(e, 'city')}
              required={true}
              type='text'
              value={userProfile.city}
            />
          </div>
        </div>
        <div>
          <button className='button settings-saveChanges' onClick={this.updateUserProfile}>
            Save Changes
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  updateInputField = (event: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    const target = event.target

    this.setState({
      userProfile: {
        ...this.state.userProfile,
        [key]: target.value
      }
    })
  }

  updateUserProfile = async (): Promise<void> => {
    const { birthdate, email, firstName, lastName } = this.state.userProfile

    if (!firstName || !lastName || !email) {
      this.setState({
        formMessage: 'First name, last name, and email address cannot be empty.'
      })
    } else if (!birthdate) {
      this.setState({
        formMessage: 'Please enter your birthday.'
      })
    } else {
      const responseMessage = await presenter.updateUserProfile(this.state.userProfile)

      if (responseMessage.includes('Success')) {
        this.setState({
          successMessage: responseMessage
        })
        await this.getUserProfile()
      } else {
        this.setState({
          errorMessage: 'Something was wrong with this update. Please try it again.'
        })
      }
    }
  }

  getUserProfile = async (): Promise<void> => {
    const settings = await presenter.getUserProfile()
    settings.birthdate = settings.birthdate?.substring(0, 10)
    this.setState({ userProfile: settings })
  }
}

export default Settings
