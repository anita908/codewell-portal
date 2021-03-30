import React, { Component, ReactElement } from 'react'
import SideNav from 'Common/SideNav'
import Fetcher from 'Drivers/Fetcher'
import ISettings from './Interfaces/ISettings'
import SettingsPresenter from './SettingsPresenter'

type State = {
  userSettings: ISettings
}

const presenter = new SettingsPresenter(new Fetcher())

class Settings extends Component<{}, State> {
  state = {
    userSettings: {
      email: '',
      firstName: '',
      lastName: '',
      age: null,
      city: ''
    }
  }

  async componentDidMount(): Promise<void> {
    await this.getUserSettings()
  }

  render(): ReactElement {
    const { userSettings } = this.state

    return (
      <div id='settings'>
        <SideNav />
        <h1>Settings</h1>
        <div className='settings-content'>
          <div>
            <span>First Name: </span> {userSettings.firstName}
          </div>
          <div>
            <span>Last Name: </span> {userSettings.lastName}
          </div>
          <div>
            <span>Email Name: </span> {userSettings.email}
          </div>
          <div>
            <span>Age: </span> {userSettings.age}
          </div>
          <div>
            <span>City: </span> {userSettings.city}
          </div>
        </div>
      </div>
    )
  }

  getUserSettings = async (): Promise<void> => {
    await presenter.getUserSettings()
    this.setState({ userSettings: presenter.settings })
  }
}

export default Settings
