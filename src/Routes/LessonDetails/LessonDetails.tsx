import React, { Component, Fragment, ReactElement } from 'react'
import Footer from 'Common/Footer'
import HomePresenter from 'Routes/Home/HomePresenter'
import homeDataStore from 'Model/HomeDataStore'
import IChapter from 'Routes/CourseSlides/Interfaces/IChapter'
import SideNav from '../../Common/SideNav/SideNav'
import './style.css'

type Props = {
  location: {
    state: {
      lessonNo: string
      lessonName: string
    }
  }
}

const presenter = new HomePresenter(homeDataStore)
class LessonDetails extends Component<Props, {}> {
  render(): ReactElement {
    const { lessonNo, lessonName } = this.props.location.state
    const courseSlide = presenter.courseSlides.find(
      (slide: IChapter) => slide.chapterNo === parseInt(lessonNo, 10)
    )

    return (
      <div id='lessonDetails'>
        <SideNav />
        <div className='lessonDetails-content'>
          <h2 className='lessonDetails-contentTitle'>Lesson {lessonNo}: </h2>
          <h2 className='lessonDetails-contentTitle'>{lessonName}</h2>
          {courseSlide && (
            <Fragment>
              <div className='lessonDetails-slideContent'>
                <button className='back' onClick={this.back} type='button'>
                  Back
                </button>
              </div>
              <iframe className='lessonDetails-slide' src={courseSlide.slidesLink} />
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
