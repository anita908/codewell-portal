import React, { Component, ReactElement } from 'react'
import SideNav from '../../Common/SideNav'

class Assignments extends Component {
  render(): ReactElement {
    return (
      <div id='assignments'>
        <SideNav />
        <div className='assignments-content'>Assignments</div>
      </div>
    )
  }
}

export default Assignments
