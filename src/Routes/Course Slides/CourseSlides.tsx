import React, { Component, ReactElement } from 'react'
import Fetcher from '../../Drivers/Fetcher'
import CourseSlidesPresenter from '../Course Slides/CourseSlidesPresenter'
import ISession from '../Home/Interfaces/ISession'

type Props = {
  sessions: ISession[]
}
class CourseSlides extends Component<Props, {}> {
  render(): ReactElement {
    return (
      <div>
        <a type='button' className='sideNav-mouseChange' onClick={this.getCourseSlides}>
          Log out
        </a>
      </div>
    )
  }

  getCourseSlides = (): void => {
    const courseSlidesPresenter = new CourseSlidesPresenter(new Fetcher())
    courseSlidesPresenter.getCourseSlides()
  }
}

export default CourseSlides
