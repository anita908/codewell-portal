import React, { Component, ReactElement } from 'react'
import SideNav from 'Common/SideNav'
import './style.css'

class Home extends Component {
  render(): ReactElement {
    return (
      <div id='adminHome'>
        <SideNav isAdmin={true} />
        <div className='adminHome-content'>
          <h3>Welcome Admin</h3>
        </div>
      </div>
    )
  }
}

export default Home
