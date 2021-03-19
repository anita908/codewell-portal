import React, { Component, ReactElement } from 'react'
import ReactPlayer from 'react-player'
import SideNav from '../../Common/SideNav/SideNav'

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
          <div className='player-wrapper'>
          <ReactPlayer
            url={'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-1.mp4'}
            controls
            />
            </div>
        </div>
      </div>
    )
  }
}

export default AssignmentInstruction
