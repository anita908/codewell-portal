import React, { Component, ReactElement } from 'react'
import SideNav from 'Common/SideNav'

class Grades extends Component {
  render(): ReactElement {
    return (
      <div id='grades'>
        <SideNav name={''} />
        <div className='grades-content'>Grades</div>
      </div>
    )
  }
}

export default Grades
