import React, { Component, Fragment, ReactElement } from 'react'
import Footer from 'Common/Footer'
import ISessionProgress from 'Routes/Home/Interfaces/ISessionProgress'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      content: ISessionProgress
      lessonId: string
      lessonName: string
    }
  }
}

class LessonDetails extends Component<Props, {}> {
  render(): ReactElement {
    const { content, lessonId, lessonName } = this.props.location.state

    return (
      <div id='lessonDetails'>
        <SideNav />
        <div className='lessonDetails-content'>
          <h2 className='lessonDetails-contentTitle'>Lesson {lessonId}: </h2>
          <h2 className='lessonDetails-contentTitle'>{lessonName}</h2>
          {content && (
            <Fragment>
              <div className='lessonDetails-slideContent'>
                <button className='lessonDetails-back' onClick={this.back} type='button'>
                  Back
                </button>
              </div>
              <iframe className='lessonDetails-slide' src={content.slidesLink} />
            </Fragment>
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

export default LessonDetails
