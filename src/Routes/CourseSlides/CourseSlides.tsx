import React, { Component, ReactElement } from 'react'
import SideNav from '../../Common/SideNav'

class CourseSlides extends Component {
  render(): ReactElement {
    return (
      <div id='courseSlides'>
        <SideNav name={''} />
        <div className='courseSlides-content'>Course Slides</div>
      </div>
    )
  }

  getCourseSlides = async (): Promise<void> => {
    const courseSlidesPresenter = new CourseSlidesPresenter(new Fetcher())
    const slides = await courseSlidesPresenter.getCourseSlides()
    this.setState({ slides })
  }
}

export default CourseSlides
