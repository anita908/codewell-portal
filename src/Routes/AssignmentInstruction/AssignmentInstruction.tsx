import React, { Component, ReactElement } from 'react'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: any
  userName: string
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonId, lessonName, userName } = this.props.location.state

    return (
      <div id='assignmentInstruction'>
        <SideNav name={userName} />
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
