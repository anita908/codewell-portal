import React, { Component, ReactElement } from 'react'
import Footer from 'Common/Footer'
import SideNav from '../../Common/SideNav'
import './style.css'

class Grades extends Component {
  render(): ReactElement {
    return (
      <div id='grades'>
        <SideNav />
        <div className='grades-content'>Grades</div>
        <Footer />
      </div>
    )
  }
}

export default Grades
