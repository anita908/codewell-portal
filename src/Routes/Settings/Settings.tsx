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
  invalidFormMessage: string
  userProfile: IProfile
}

const presenter = new SettingsPresenter(new Fetcher(), homeDataStore)
class Settings extends Component<{}, State> {
  state = {
    userProfile: {
      birthday: '',
      city: '',
      state: '',
      email: '',
      firstName: '',
      lastName: ''
    },
    invalidFormMessage: ''
  }

  componentDidMount(): void {
    this.getUserProfile()
  }

  render(): ReactElement {
    const { userProfile, invalidFormMessage } = this.state

    return (
      <div id='settings'>
        <SideNav />
        <h1>Settings</h1>
        <Link to='/settings/resetPassword'>Change Password</Link>
        <div className='settings-content'>
          <p>{invalidFormMessage}</p>
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
          <label htmlFor='birthday' className='inputLabel'>
            Birthday:{' '}
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='birthday'
              onChange={(e) => this.updateInputField(e, 'age')}
              required={true}
              type='date'
              value={userProfile.birthday || ''}
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
          <button onClick={this.updateUserProfile}>Save Changes</button>
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
        [key]: key === 'age' ? parseInt(target.value) : target.value
      }
    })
  }

  updateUserProfile = async (): Promise<void> => {
    const { birthday, email, firstName, lastName } = this.state.userProfile

    if (!firstName || !lastName || !email) {
      this.setState({
        invalidFormMessage: 'First name, last name, and email address cannot be empty.'
      })
    } else if (!birthday) {
      this.setState({
        invalidFormMessage: 'Please enter your birthday.'
      })
    } else {
      this.setState({
        invalidFormMessage: ''
      })

      await presenter.updateUserProfile(this.state.userProfile)
    }
  }

  getUserProfile = async (): Promise<void> => {
    const settings = await presenter.getUserProfile()
    this.setState({ userProfile: settings })
  }
}

export default Settings
