import { Link } from 'react-router-dom'
import React, { ChangeEvent, Component, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import homeDataStore from 'Model/HomeDataStore'
import IProfile from './Interfaces/IProfile'
import SettingsPresenter from './SettingsPresenter'
import SideNav from 'Common/SideNav'
import './style.css'

type State = {
  userProfile: IProfile
  editingProfile: boolean
  invalidFormMessage: string
}

const presenter = new SettingsPresenter(new Fetcher(), homeDataStore)
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
    const { userProfile, editingProfile, invalidFormMessage } = this.state

    return (
      <div id='settings'>
        <SideNav />
        <h1>Settings</h1>
        <div className='settings-content'>
          <p>{invalidFormMessage}</p>
          <div>
            <label>First Name:</label>
            <input
              type='text'
              value={userProfile.firstName}
              onChange={(e) => this.updateInputField(e, 'firstName')}
              disabled={!editingProfile}
              required={true}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type='text'
              value={userProfile.lastName}
              onChange={(e) => this.updateInputField(e, 'lastName')}
              disabled={!editingProfile}
              required={true}
            />
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type='text'
              value={userProfile.email}
              onChange={(e) => this.updateInputField(e, 'email')}
              disabled={!editingProfile}
              required={true}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type='text'
              value={userProfile.age || ''}
              onChange={(e) => this.updateInputField(e, 'age')}
              disabled={!editingProfile}
              required={true}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type='text'
              value={userProfile.city}
              onChange={(e) => this.updateInputField(e, 'city')}
              disabled={!editingProfile}
              required={true}
            />
          </div>
        </div>
        <div>
          {editingProfile ? (
            <button onClick={this.updateUserProfile}>Save</button>
          ) : (
            <button onClick={() => this.setState({ editingProfile: true })}>Edit</button>
          )}
        </div>
        <Link to='/settings/resetPassword'>Change Password</Link>
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
      this.setState({ editingProfile: false })
    }
  }

  getUserProfile = async (): Promise<void> => {
    const settings = await presenter.getUserProfile()
    this.setState({ userProfile: settings })
  }
}

export default Settings
