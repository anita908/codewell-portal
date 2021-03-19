import React, { Component, ReactElement } from 'react'
import ReactPlayer from 'react-player'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      lessonId: number
      lessonName: string
      userName: string
    }
  }
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonId, lessonName, userName } = this.props.location.state

    return (
      <div id='assignmentInstruction'>
        <SideNav name={userName} />
        <div className='assignmentInstruction-content'>
          <h2>
            Lesson {lessonId}: {lessonName} Assignment Instruction
          </h2>
          <ReactPlayer
            className='assignmentInstruction-player'
            controls
            url={`https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-1.mp4`}
          />
        </div>
      </div>
    )
  }
}

export default AssignmentInstruction
