import React, { Component, ReactElement } from 'react'
import SideNav from 'Common/SideNav'

class Settings extends Component {
  render(): ReactElement {
    return (
      <div id='settings'>
        <SideNav name={''} />
        <div className='settings-content'>Settings</div>
      </div>
    )
  }
}

export default Settings
