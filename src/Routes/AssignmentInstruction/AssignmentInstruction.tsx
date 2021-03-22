import React, { Component, ReactElement } from 'react'
import IAssignmentVideo from '../Home/Interfaces/IAssignmentVideo'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      lessonId: number
      lessonName: string
      userName: string
      content: any
    }
  }
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonId, lessonName, userName, content } = this.props.location.state
    const { videos } = content

    return (
      <div id='assignmentInstruction'>
        <SideNav name={userName} />
        <div className='assignmentInstruction-content'>
          <h2 className='assignmentInstruction-contentTitle'>Lesson {lessonId}: </h2>
          <h2 className='assignmentInstruction-contentTitle'>
            {lessonName} Assignment Instruction
          </h2>

          {videos.map((v: IAssignmentVideo, index: number) => {
            return (
              <div className='assignmentInstruction-playerContent'>
                {index === 0 && (
                  <button className='assignmentInstruction-back' onClick={this.back} type='button'>
                    Back
                  </button>
                )}
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

  back = (): void => {
    window.history.back()
  }
}

export default AssignmentInstruction
