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
        courseId: number
        homeworkId: number
        lessonNo: string
        lessonName: string
        sessionId: number
      }
    }
  }
}

type State = {
  isLoading: boolean
  videos: IAssignmentVideo[]
}

class AssignmentInstruction extends Component<Props, State> {
  state = {
    isLoading: false,
    videos: []
  }

  async componentDidMount(): Promise<void> {
    const { courseId, lessonNo } = this.props.location.state.content
    this.setState({ isLoading: true })
    const videos = await new AssignmentPresenter(assignmentDataStore).getHomeworkVideosByLessonId(
      courseId,
      parseInt(lessonNo, 10)
    )

    this.setState({ isLoading: false, videos })
  }

  render(): ReactElement {
    const { homeworkId, lessonNo, lessonName, sessionId } = this.props.location.state.content
    const { isLoading, videos } = this.state

    if (isLoading) {
      return this.renderLoadingState()
    }

    if (videos && !videos.length) {
      return this.renderEmptyVideoList()
    }

    return (
      <div id='assignmentInstruction'>
        <SideNav />
        <div className='assignmentInstruction-content'>
          <h2 className='assignmentInstruction-contentTitle'>Lesson {lessonNo}: </h2>
          <h2 className='assignmentInstruction-contentTitle'>
            {lessonName} Assignment Instruction
          </h2>
          <Link
            to={{
              pathname: '/uploadAssignment',
              state: {
                chapterName: lessonName,
                homeworkId,
                lessonNumber: lessonNo,
                sessionId
              }
            }}
          >
            I am ready to submit my assignment!
          </Link>

          {videos.map((video: IAssignmentVideo, index: number) => {
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
                <iframe src={video.storageUrl} allowFullScreen />
              </div>
            )
          })}
        </div>
        <Footer />
      </div>
    )
  }

  renderLoadingState = (): ReactElement => {
    const { homeworkId, lessonNo, lessonName, sessionId } = this.props.location.state.content

    return (
      <div id='assignmentInstruction'>
        <SideNav />
        <div className='assignmentInstruction-content'>
          <h2 className='assignmentInstruction-contentTitle'>Lesson {lessonNo}: </h2>
          <h2 className='assignmentInstruction-contentTitle'>
            {lessonName} Assignment Instruction
          </h2>
          <Link
            to={{
              pathname: '/uploadAssignment',
              state: {
                chapterName: lessonName,
                homeworkId,
                lessonNumber: lessonNo,
                sessionId
              }
            }}
          >
            I am ready to submit my assignment!
          </Link>
          <div className='assignmentInstruction-playerContent'>
            <button className='assignmentInstruction-back' onClick={this.back} type='button'>
              Back
            </button>
            <div className='loading assignmentInstruction-loadingContent'></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderEmptyVideoList = (): ReactElement => {
    const { homeworkId, lessonNo, lessonName, sessionId } = this.props.location.state.content

    return (
      <div id='assignmentInstruction'>
        <SideNav />
        <div className='assignmentInstruction-content'>
          <h2 className='assignmentInstruction-contentTitle'>Lesson {lessonNo}: </h2>
          <h2 className='assignmentInstruction-contentTitle'>
            {lessonName} Assignment Instruction
          </h2>
          <Link
            to={{
              pathname: '/uploadAssignment',
              state: {
                chapterName: lessonName,
                homeworkId,
                lessonNumber: lessonNo,
                sessionId
              }
            }}
          >
            I am ready to submit my assignment!
          </Link>
          <div className='assignmentInstruction-playerContent'>
            <button className='assignmentInstruction-back' onClick={this.back} type='button'>
              Back
            </button>
            <p className='assignmentInstruction-videoTitle note'>
              There is no assignment instruction for this lesson. Please contact your teacher if you
              have any questions :)
            </p>
          </div>
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
