import React, { Component, ReactElement } from 'react'
import SideNav from 'Common/SideNav'

class CourseSlides extends Component {
  render(): ReactElement {
    return (
      <div id='courseSlides'>
        <SideNav name={''} />
        <div className='courseSlides-content'>Course Slides</div>
      </div>
    )
  }
}

export default CourseSlides
