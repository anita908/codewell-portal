import React, { Component, ReactElement } from 'react'
import homeDataStore from 'Model/HomeDataStore'
import HomePresenter from 'Routes/Home/HomePresenter'
import IChapter from './Interfaces/IChapter'
import SideNav from '../../Common/SideNav'
import './style.css'

const presenter = new HomePresenter(homeDataStore)
class CourseSlides extends Component {
  render(): ReactElement {
    const slides = presenter.courseSlides

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
      </div>
    )
  }
}

export default CourseSlides
