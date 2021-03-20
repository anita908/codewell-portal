import React, { Component, ReactElement } from 'react'
import ReactPlayer from 'react-player'
import IAssignmentVideo from 'Routes/Home/Interfaces/IAssignmentVideo'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      lessonId: number
      lessonName: string
      userName: string
      videos: IAssignmentVideo[]
    }
  }
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonId, lessonName, userName, videos } = this.props.location.state

    return (
      <div id='assignmentInstruction'>
        <SideNav name={userName} />
        <div className='assignmentInstruction-content'>
          <h2 className='assignmentInstruction-contentTitle'>Lesson {lessonId}: </h2>
          <h2 className='assignmentInstruction-contentTitle'>
            {lessonName} Assignment Instruction
          </h2>
          {videos.map((v: IAssignmentVideo) => {
            return (
              <div className='assignmentInstruction-playerContent'>
                <p className='assignmentInstruction-videoTitle'>{v.name}</p>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video controls>
                  <source src={v.storageUrl} type='video/mp4' />
                </video>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AssignmentInstruction
