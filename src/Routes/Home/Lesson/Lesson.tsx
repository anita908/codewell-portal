import React, { Component, Fragment, ReactElement } from 'react'
import Card from '../../../Common/Card/Card'
import IChapterProgress from '../Interfaces/IChapterProgress'
import IHomePresenter from '../IHomePresenter'
import './style.css'

type Prop = {
  homePresenter: IHomePresenter
  lessons: IChapterProgress[]
  userName: string
}

type State = {
  showMore: boolean
}

class Lesson extends Component<Prop, State> {
  state = {
    showMore: false
  }

  render(): ReactElement {
    const { homePresenter } = this.props
    const { lessons } = homePresenter
    const { showMore } = this.state

    if (lessons && lessons.length) {
      const displayLessons: IChapterProgress[] = showMore ? lessons : [lessons[0], lessons[1]]

      return (
        <div id='lesson'>
          <div className='lesson-header'>
            <h3>Lessons</h3>
            <details onClick={this.toggleSection} className='lesson-toggleExpandButton'>
              <summary>View More</summary>
            </details>
          </div>
          <div className='lesson-content'>
            {displayLessons.map((lesson: IChapterProgress) => {
              return (
                <Fragment key={lesson.chapterId}>
                  <Card
                    activity={'in-class activity'}
                    endPoint={'lessonDetails'}
                    header={`Lesson ${lesson.chapterNo}:`}
                    linkTitle={'View Course Slides'}
                    pathId={lesson.chapterId.toString() || ''}
                    title={lesson.chapterName || ''}
                  />
                </Fragment>
              )
            })}
          </div>
        </div>
      )
    }

    return this.renderLoadingState()
  }

  toggleSection = (): void => {
    this.setState(
      (prevState) => ({
        showMore: !prevState.showMore
      }),
      () => {
        const lessonContent = document.querySelector('.lesson-content') as HTMLElement
        const lessonCards = Array.from(
          document.querySelectorAll('.lesson-content > .card')
        ) as HTMLElement[]

        if (lessonContent && this.state.showMore) {
          lessonContent.classList.add('lesson-adjustGrid')
        } else if (lessonCards && !this.state.showMore) {
          lessonContent.classList.remove('lesson-adjustGrid')
        }

        if (lessonCards && this.state.showMore) {
          lessonCards.forEach((lessonCard: HTMLElement) => {
            lessonCard.classList.add('adjustCardWidth')
          })
        } else if (lessonCards && !this.state.showMore) {
          lessonCards.forEach((lessonCard: HTMLElement) => {
            lessonCard.classList.remove('adjustCardWidth')
          })
        }
      }
    )
  }

  renderLoadingState = (): ReactElement => {
    return (
      <div id='lesson'>
        <div className='lesson-header'>
          <h3>Lessons</h3>
          <details className='lesson-toggleExpandButton loadingButton'>
            <summary>View More</summary>
          </details>
        </div>
        <div className='lesson-content'>
          <Card activity={''} endPoint={''} header={''} linkTitle={''} pathId={''} title={''} />
        </div>
      </div>
    )
  }
}

export default Lesson
