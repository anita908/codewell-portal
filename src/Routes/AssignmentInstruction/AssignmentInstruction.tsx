import React, { Component, ReactElement } from 'react'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: any
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonId, lessonName } = this.props.location.state

    return (
      <div id='assignmentInstruction'>
        <SideNav name={''} />
        <div className='assignmentInstruction-content'>
          <p>
            Lesson {lessonId}: {lessonName}
          </p>
          <div>assignment instruction</div>
        </div>
      </div>
    )
  }
}

export default AssignmentInstruction
