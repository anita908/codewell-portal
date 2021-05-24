import React, { Component, ReactElement } from 'react'
import Footer from 'Common/Footer'
import SideNav from '../../Common/SideNav'
import './style.css'

class Assignments extends Component {
  render(): ReactElement {
    return (
      <div id='assignments'>
        <SideNav username={localStorage.getItem('firstname') || ''} />
        <div className='assignments-content'>Assignments</div>
        <Footer />
      </div>
    )
  }
}

export default Assignments
