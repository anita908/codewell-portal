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
          <h2>
            Lesson {lessonId}: {lessonName} Assignment Instruction
          </h2>
          {videos.map((v: IAssignmentVideo) => {
            return (
              <div>
                <p>{v.name}</p>
                <ReactPlayer className='assignmentInstruction-player' controls url={v.storageUrl} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AssignmentInstruction
