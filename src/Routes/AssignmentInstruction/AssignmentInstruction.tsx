import React, { Component, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import assignmentDataStore from 'Model/AssignmentDataStore'
import AssignmentPresenter from 'Routes/Home/Assignment/AssignmentPresenter'
import Footer from 'Common/Footer'
import IAssignmentVideo from '../Home/Interfaces/IAssignmentVideo'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      content: {
        homeworkId: number
        lessonId: string
        lessonName: string
        sessionId: number
      }
    }
  }
}

class AssignmentInstruction extends Component<Props, {}> {
  render(): ReactElement {
    const { homeworkId, lessonId, lessonName, sessionId } = this.props.location.state.content
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
          <Link
            to={{
              pathname: '/uploadAssignment',
              state: {
                chapterName: lessonName,
                homeworkId,
                lessonNumber: lessonId,
                sessionId
              }
            }}
          >
            I am ready to submit my assignment!
          </Link>

          {videos.length > 0 ? (
            videos.map((video: IAssignmentVideo, index: number) => {
              return (
                <div className='assignmentInstruction-playerContent' key={index}>
                  {index === 0 && (
                    <button
                      className='assignmentInstruction-back back'
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
        <Footer />
      </div>
    )
  }

  back = (): void => {
    window.history.back()
  }
}

export default AssignmentInstruction
