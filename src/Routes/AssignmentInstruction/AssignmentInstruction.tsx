import React, { Component, ReactElement } from 'react'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

class AssignmentInstruction extends Component {
  render(): ReactElement {
    return (
      <div id='assignmentInstruction'>
        <SideNav name={''} />
        <div className='assignmentInstruction-content'>
          <div>assignment instruction</div>
        </div>
      </div>
    )
  }
}

export default AssignmentInstruction
