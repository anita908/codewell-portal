import React, { Component, ReactElement } from 'react'
import CourseSlidesPresenter from '../CourseSlides/CourseSlidesPresenter'
import Fetcher from '../../Drivers/Fetcher'
import IChapter from './Interfaces/IChapter'
import ICourseWithChapters from './Interfaces/ICourseWithChapters'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  courses: ICourseWithChapters[]
  isLoading: boolean
  name: string
}
class CourseSlides extends Component<{}, State> {
  state = {
    courses: [],
    isLoading: false,
    name: ''
  }

  componentDidMount() {
    this.getCourseSlides()
  }

  render(): ReactElement {
    const { courses, isLoading } = this.state
    return (
      <div id='courseSlides'>
        <SideNav />
        <div className='courseSlides-content'>
          <div className='courseSlides-header'>Course Slides</div>
          {isLoading ? (
            <h3>Slides are loading</h3>
          ) : (
            <div>
              {courses.map((course: ICourseWithChapters) => (
                <div key={course.id} className='courseSlides-course'>
                  <div className='courseSlides-course-title'>
                    <h2>{course.courseName}</h2>
                  </div>
                  {course.chapters.map((chapter: IChapter) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  getCourseSlides = async (): Promise<void> => {
    this.setState({ isLoading: true })
    const courseSlidesPresenter = new CourseSlidesPresenter(new Fetcher())
    await courseSlidesPresenter.fetchAndAssignCourseWithChapters()
    this.setState({ courses: courseSlidesPresenter.courseWithChapters })
    this.setState({ isLoading: false })
  }
}

export default CourseSlides
