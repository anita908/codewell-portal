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

type State = {
  slides: IChapter[]
}

const presenter = new HomePresenter(homeDataStore)
class LessonDetails extends Component<Props, State> {
  state = {
    slides: [
      {
        id: -1,
        chapterNo: -1,
        name: '',
        slidesLink: ''
      }
    ]
  }

  async componentDidMount(): Promise<void> {
    const slides = presenter.getCourseSlides()

    if (slides && !slides.length) {
      await presenter.getHomeData()
    }

    this.setState({ slides: presenter.getCourseSlides() })
  }

  render(): ReactElement {
    const { lessonNo, lessonName } = this.props.location.state
    const { slides } = this.state
    const courseSlide = slides.find((slide: IChapter) => slide.chapterNo === parseInt(lessonNo, 10))

    return (
      <div id='lessonDetails'>
        <SideNav username={localStorage.getItem('firstname') || ''} />
        <div className='lessonDetails-content'>
          <h2 className='lessonDetails-contentTitle'>Lesson {lessonNo}: </h2>
          <h2 className='lessonDetails-contentTitle'>{lessonName}</h2>
          {courseSlide?.slidesLink ? (
            <Fragment>
              <div className='lessonDetails-slideContent'>
                <button className='back' onClick={this.back} type='button'>
                  Back
                </button>
              </div>
              <iframe className='lessonDetails-slide' src={courseSlide.slidesLink} />
            </Fragment>
          ) : (
            <div className='lessonDetails-slideContent'>
              <button className='back' onClick={this.back} type='button'>
                Back
              </button>
              <p className='lessonDetails-slideTitle note'>
                There is no course slide for this lesson yet. Please contact your teacher if you
                have any questions :)
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

export default LessonDetails
