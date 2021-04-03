import { Link } from 'react-router-dom'
import React, { ChangeEvent, Component, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import IProfile from './Interfaces/IProfile'
import Footer from 'Common/Footer'
import HomeDataStore from 'Model/HomeDataStore'
import SettingsPresenter from './SettingsPresenter'
import SideNav from 'Common/SideNav'
import './style.css'

type State = {
  invalidFormMessage: string
  userProfile: IProfile
}

const presenter = new SettingsPresenter(new Fetcher(), new HomeDataStore(new Fetcher()))
class Settings extends Component<{}, State> {
  state = {
    userProfile: {
      age: null,
      city: '',
      email: '',
      firstName: '',
      lastName: ''
    },
    editingProfile: false,
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
          <label htmlFor='age' className='inputLabel'>
            Age:{' '}
          </label>
          <div className='inputWrapper'>
            <input
              className='input'
              id='age'
              onChange={(e) => this.updateInputField(e, 'age')}
              required={true}
              type='text'
              value={userProfile.age || ''}
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

  updateInputField = (event: ChangeEvent<HTMLInputElement>, key: string): void => {
    const target = event.target
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        [key]: key === 'age' ? parseInt(target.value) : target.value
      }
    })
  }

  updateUserProfile = async (): Promise<void> => {
    const { firstName, lastName, email, age } = this.state.userProfile
    if (!firstName || !lastName || !email) {
      this.setState({
        invalidFormMessage: 'First name, last name, and email address cannot be empty.'
      })
    } else if (!age) {
      this.setState({
        invalidFormMessage: 'Age must be greater than 0.'
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
