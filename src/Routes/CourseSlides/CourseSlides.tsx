import React, { Component, Fragment, ReactElement } from 'react'
import Footer from 'Common/Footer'
import homeDataStore from 'Model/HomeDataStore'
import HomePresenter from 'Routes/Home/HomePresenter'
import IChapter from './Interfaces/IChapter'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  slides: IChapter[]
}

const presenter = new HomePresenter(homeDataStore)
class CourseSlides extends Component<{}, State> {
  state = {
    slides: []
  }

  async componentDidMount(): Promise<void> {
    const slides = presenter.getCourseSlides()

    if (slides && !slides.length) {
      await presenter.getHomeData()
    }

    this.setState({ slides: presenter.getCourseSlides() })
  }

  render(): ReactElement {
    const { slides } = this.state
    const courseLinks = slides.map((slide: IChapter) => slide.slidesLink)

    return (
      <div id='courseSlides'>
        <SideNav username={localStorage.getItem('firstname') || ''} />
        <div className='courseSlides-content'>
          <div className='courseSlides-header'>Course Slides</div>
          <button className='back courseSlides-back' onClick={this.back} type='button'>
            Back
          </button>
          <div className='courseSlides-links'>
            {slides.map(
              (chapter: IChapter) =>
                chapter.slidesLink && (
                  <a
                    className='courseSlides-link'
                    href={chapter.slidesLink}
                    key={chapter.id}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Lesson.
                    {chapter.id}: {chapter.name}
                  </a>
                )
            )}
            {courseLinks.length === 0 && (
              <Fragment>
                <div className='note'>
                  <p>
                    There is no course slides at this moment :/ <br />
                    Please contact your teacher if you have any questions :)
                  </p>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  back(): void {
    window.history.back()
  }
}

export default CourseSlides
