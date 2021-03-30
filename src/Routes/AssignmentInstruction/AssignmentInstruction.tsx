import React, { Component, ReactElement } from 'react'
import assignmentDataStore from 'Model/AssignmentDataStore'
import AssignmentPresenter from 'Routes/Home/Assignment/AssignmentPresenter'
import IAssignmentVideo from '../Home/Interfaces/IAssignmentVideo'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      lessonId: string
      lessonName: string
    }
  }
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonId, lessonName } = this.props.location.state
    const videos = new AssignmentPresenter(assignmentDataStore).getHomeworkVideosByLessonId(
      parseInt(lessonId, 10)
    )

    return (
      <div id='assignmentInstruction'>
        <SideNav />
        <div className='assignmentInstruction-content'>
          <h2 className='assignmentInstruction-contentTitle'>Lesson {lessonId}: </h2>
          <h2 className='assignmentInstruction-contentTitle'>
            {lessonName} Assignment Instruction
          </h2>

          {videos.length > 0 ? (
            videos.map((video: IAssignmentVideo, index: number) => {
              return (
                <div className='assignmentInstruction-playerContent' key={index}>
                  {index === 0 && (
                    <button
                      className='assignmentInstruction-back'
                      onClick={this.back}
                      type='button'
                    >
                      Back
                    </button>
                  )}
                  <p className='assignmentInstruction-videoTitle'>{video.name}</p>
                  <video controls>
                    <source src={video.storageUrl} type='video/mp4' />
                  </video>
                </div>
              )
            })
          ) : (
            <div className='assignmentInstruction-playerContent'>
              <button className='assignmentInstruction-back' onClick={this.back} type='button'>
                Back
              </button>
              <p className='assignmentInstruction-videoTitle note'>
                There is no assignment instruction for this lesson. Please contact your teacher if
                you have any questions :)
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  back = (): void => {
    window.history.back()
  }
}

export default AssignmentInstruction
