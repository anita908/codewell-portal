import React, { Component, ReactElement } from 'react'
import SideNav from 'Common/SideNav'

class Settings extends Component {
  render(): ReactElement {
    return (
      <div id='settings'>
        <SideNav />
        <div className='settings-content'>Settings</div>
      </div>
    )
  }
}

export default Settings
