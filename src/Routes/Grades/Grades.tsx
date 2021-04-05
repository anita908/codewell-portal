import React, { Component, Fragment, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import Footer from 'Common/Footer'
import GradesPresenter from './GradesPresenter'
import IChapterGradesModel from './Interfaces/IChapterGradesModel'
import IHomeworkProgress from 'Routes/Home/Interfaces/IHomeworkProgress'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  sessionGradesModel: IChapterGradesModel[]
  overallGrade: number
}

const gradesPresenter = new GradesPresenter(new Fetcher())

class Grades extends Component<{}, State> {
  state = {
    sessionGradesModel: [],
    overallGrade: -1
  }

  componentDidMount(): void {
    this.getChapterProgressModels()
  }

  render(): ReactElement {
    const { sessionGradesModel, overallGrade } = this.state

    return (
      <div id='grades'>
        <SideNav />
        <div className='grades-header'>Grades</div>
        <div className='grades-content'>
          <button className='lessonDetails-back' onClick={this.back} type='button'>
            Back
          </button>
          <table className='chapter-table'>
            <thead>
              <th>
                <td>Chapter Number</td>
                <td>Chapter Name</td>
                <td>Chapter Score</td>
              </th>
            </thead>
            <tbody>
              {sessionGradesModel.map((chapterProgress: IChapterGradesModel) => (
                <Fragment key={chapterProgress.chapterId}>
                  <tr
                    className='chapter-row'
                    onClick={() => this.triggerShowHomework(chapterProgress.chapterName)}
                  >
                    <td>{chapterProgress.chapterNo}</td>
                    <td>{chapterProgress.chapterName}</td>
                    <td>{this.calculateChapterAverage(chapterProgress.homeworkProgress)}%</td>
                  </tr>
                  {chapterProgress.showHomeworkProgress ? (
                    <tr>
                      <td colSpan={3}>
                        <table className='homework-table'>
                          <thead>
                            <th>
                              <td>Homework Name</td>
                              <td>Homework Link</td>
                              <td>Submitted</td>
                              <td>Score</td>
                            </th>
                          </thead>
                          <tbody>
                            {chapterProgress.homeworkProgress.map((homework: IHomeworkProgress) => (
                              <tr className='homework-row' key={homework.homeworkId}>
                                <td>{homework.homeworkName}</td>
                                <td>
                                  <a href={homework.homeworkLink}>{homework.homeworkLink}</a>
                                </td>
                                <td>{homework.submitted === true ? 'Yes' : 'No'}</td>
                                <td>{homework.homeworkScore || '--'}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
          <h3>
            Overall Grade: {this.determineGradeLevel(overallGrade)} ({overallGrade}%)
          </h3>
        </div>
        <Footer />
      </div>
    )
  }

  calculateChapterAverage(homeworkProgress: IHomeworkProgress[]): number {
    return (
      homeworkProgress.reduce(
        (currentSum: number, homework: IHomeworkProgress) =>
          currentSum + (homework.homeworkScore || 100),
        0
      ) / homeworkProgress.length
    )
  }

  determineGradeLevel(grade: number) {
    let gradeLevel = ''
    if (grade < 65) {
      gradeLevel = 'F'
    } else if (grade < 70) {
      gradeLevel = 'D'
    } else if (grade < 73) {
      gradeLevel = 'C-'
    } else if (grade < 77) {
      gradeLevel = 'C'
    } else if (grade < 80) {
      gradeLevel = 'C+'
    } else if (grade < 83) {
      gradeLevel = 'B-'
    } else if (grade < 87) {
      gradeLevel = 'B'
    } else if (grade < 90) {
      gradeLevel = 'B+'
    } else if (grade < 93) {
      gradeLevel = 'A-'
    } else if (grade < 97) {
      gradeLevel = 'A'
    } else if (grade <= 100) {
      gradeLevel = 'A+'
    }
    return gradeLevel
  }

  triggerShowHomework(key: string): void {
    const newSessionGradesModel = [...this.state.sessionGradesModel] as IChapterGradesModel[]
    const index = newSessionGradesModel.findIndex(
      (chapterProgress: IChapterGradesModel) => chapterProgress.chapterName === key
    )
    const currentValue = newSessionGradesModel[index].showHomeworkProgress
    newSessionGradesModel[index].showHomeworkProgress = !currentValue
    this.setState({ sessionGradesModel: newSessionGradesModel })
  }

  back(): void {
    window.history.back()
  }

  async getChapterProgressModels(): Promise<void> {
    this.setState({
      sessionGradesModel: await gradesPresenter.getSessionGradesModel(),
      overallGrade: await gradesPresenter.getOverallGrade()
    })
  }
}

export default Grades
