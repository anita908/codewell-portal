import React, { Component, ReactElement } from 'react'
import CourseSlidesPresenter from '../CourseSlides/CourseSlidesPresenter'
import Fetcher from '../../Drivers/Fetcher'

type State = {
  slides: Array<Object>
}
class CourseSlides extends Component<{}, State> {
  state = {
    slides: []
  }

  componentDidMount() {
    this.getCourseSlides()
  }

  render(): ReactElement {
    const { slides } = this.state

    return (
      <div id='courseSlides'>
        <div className='courseSlides-content'>Course Slides</div>
        <p>{slides}</p>
      </div>
    )
  }

  getCourseSlides = (): void => {
    const courseSlidesPresenter = new CourseSlidesPresenter(new Fetcher())
    const slides = courseSlidesPresenter.getCourseSlides(1)
    this.setState({ slides: slides })
  }
}

export default CourseSlides
