import React, { Component, ReactElement } from 'react'
import CourseSlidesPresenter from '../CourseSlides/CourseSlidesPresenter'
import Fetcher from '../../Drivers/Fetcher'
import ICourseSlide from './Interfaces/ICourseSlide'

type State = {
  slides: ICourseSlide[][]
}
class CourseSlides extends Component<{}, State> {
  state = {
    slides: []
  }

  componentDidMount() {
    this.getCourseSlides()
  }

class CourseSlides extends Component {
  render(): ReactElement {
    return (
      <div id='courseSlides'>
        <SideNav name={''} />
        <div className='courseSlides-content'>Course Slides</div>
<<<<<<< HEAD
=======
        <div>
          {slides.map((e: ICourseSlide[]) => (
            <div>
              {e.map((c: ICourseSlide) => (
                <p>{c.slidesLink}</p>
              ))}
            </div>
          ))}
        </div>
>>>>>>> receieve class slide from back end
      </div>
    )
  }

  getCourseSlides = async (): Promise<void> => {
    const courseSlidesPresenter = new CourseSlidesPresenter(new Fetcher())
    await courseSlidesPresenter.getCourseSlides()
    this.setState({ slides: courseSlidesPresenter.slides })
  }
}

export default CourseSlides
