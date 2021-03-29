import React, { Component, ReactElement } from 'react'
import CourseSlidesPresenter from '../CourseSlides/CourseSlidesPresenter'
import Fetcher from '../../Drivers/Fetcher'
import IChapter from './Interfaces/IChapter'
import ICourseWithChapters from './Interfaces/ICourseWithChapters'

type State = {
  courses: ICourseWithChapters[]
}
class CourseSlides extends Component<{}, State> {
  state = {
    courses: []
  }

  componentDidMount() {
    this.getCourseSlides()
  }

  render(): ReactElement {
    const { courses } = this.state
    return (
      <div id='courseSlides'>
        <div className='courseSlides-content'>Course Slides</div>
        <div>
          {courses.map((course: ICourseWithChapters) => (
            <div key={course.id}>
              <h2>{course.courseName}</h2>
              {course.chapters.map((chapter: IChapter) => (
                <div key={chapter.id}>
                  <a href={chapter.slidesLink}>{chapter.name}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  getCourseSlides = async (): Promise<void> => {
    const courseSlidesPresenter = new CourseSlidesPresenter(new Fetcher())
    await courseSlidesPresenter.fetchAndAssignCourseWithChapters()
    this.setState({ courses: courseSlidesPresenter.courseWithChapters })
  }
}

export default CourseSlides
