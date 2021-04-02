import React, { Component, ReactElement } from 'react'
import CourseSlideDataStore from 'Model/CourseSlideDataStore'
import CourseSlidesPresenter from './CourseSlidesPresenter'
import Fetcher from 'Drivers/Fetcher'
import Footer from 'Common/Footer'
import IChapter from './Interfaces/IChapter'
import SideNav from '../../Common/SideNav'
import './style.css'

class CourseSlides extends Component {
  state = {
    slides: []
  }

  async componentDidMount(): Promise<void> {
    this.getSlides()
  }

  render(): ReactElement {
    const { slides } = this.state

    return (
      <div id='courseSlides'>
        <SideNav />
        <div className='courseSlides-content'>
          <div className='courseSlides-header'>Course Slides</div>
          <div>
            {slides.map((chapter: IChapter) => (
              <div key={chapter.id} className='courseSlides-links'>
                <a
                  href={chapter.slidesLink}
                  className='courseSlides-link'
                  target='_blank'
                  rel='noreferrer'
                >
                  Lesson.
                  {chapter.id}: {chapter.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  private getSlides = async () => {
    const presenter = new CourseSlidesPresenter(new CourseSlideDataStore(new Fetcher()))
    const slides = await presenter.getCourseSlides()

    this.setState({ slides })
  }
}

export default CourseSlides
