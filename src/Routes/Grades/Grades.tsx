import React, { Component, Fragment, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import Footer from 'Common/Footer'
import DateHelper from 'Utilities/DateHelper'
import GradesPresenter from './GradesPresenter'
import IChapterGradesModel from './Interfaces/IChapterGradesModel'
import IHomeworkProgress from 'Routes/Home/Interfaces/IHomeworkProgress'
import SideNav from '../../Common/SideNav'
import './style.css'

type State = {
  sessionGradesModel: IChapterGradesModel[]
  overallGrade: number | null
}

const gradesPresenter = new GradesPresenter(new Fetcher())

class Grades extends Component<{}, State> {
  state = {
    sessionGradesModel: [],
    overallGrade: null
  }

  componentDidMount(): void {
    this.getChapterProgressModels()
  }

  render(): ReactElement {
    const { sessionGradesModel, overallGrade } = this.state

    return (
      <div id='grades'>
        <SideNav />
        <div className='grades-content'>
          <div className='grades-header'>Grades</div>
          <button className='back lessonDetails-back' onClick={this.back} type='button'>
            Back
          </button>
          <table className='grades-table'>
            <thead className='grades-table-header'>
              <tr>
                <th>Chapter Number</th>
                <th>Chapter Name</th>
                <th>Chapter Score</th>
              </tr>
            </thead>
            <tbody>
              {sessionGradesModel.map((chapterProgress: IChapterGradesModel) => (
                <Fragment key={chapterProgress.chapterId}>
                  <tr
                    className='grades-row'
                    onClick={() => this.triggerShowHomework(chapterProgress.chapterName)}
                  >
                    <td>{chapterProgress.chapterNo}</td>
                    <td>{chapterProgress.chapterName}</td>
                    <td>{this.calculateChapterAverage(chapterProgress.homeworkProgress)}%</td>
                  </tr>
                  {chapterProgress.showHomeworkProgress ? (
                    <tr>
                      <td colSpan={3}>
                        <table className='grades-homeworkTable'>
                          <thead>
                            <tr>
                              <th>Homework Name</th>
                              <th>Link</th>
                              <th>Due Date</th>
                              <th>Submission</th>
                              <th>Submitted</th>
                              <th>Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chapterProgress.homeworkProgress.map((homework: IHomeworkProgress) => (
                              <tr className='grades-homeworkRow' key={homework.homeworkId}>
                                <td>{homework.homeworkName}</td>
                                <td>
                                  {homework.homeworkLink ? (
                                    <a href={homework.homeworkLink}>Link</a>
                                  ) : (
                                    'N/A'
                                  )}
                                </td>
                                <td>
                                  {DateHelper.convertStringToMoment(homework.dueDate)?.format(
                                    'MM-DD-YYYY'
                                  ) || 'N/A'}
                                </td>
                                <td>
                                  {homework.submissionUrl ? (
                                    <a href={homework.submissionUrl}>Submission</a>
                                  ) : (
                                    'N/A'
                                  )}
                                </td>
                                <td>{homework.submitted === 'true' ? 'Yes' : 'No'}</td>
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
          <h3>Overall Grade: {this.renderOverallGrade(overallGrade || 0)}</h3>
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

  renderOverallGrade = (overallGrade: number): ReactElement => {
    const gradeLevel = this.determineGradeLevel(overallGrade)

    if (overallGrade >= 90) {
      return (
        <Fragment>
          <span className='success'>{gradeLevel}</span> ({' '}
          <span className='success'>{overallGrade}%</span> )
        </Fragment>
      )
    } else if (overallGrade >= 65) {
      return (
        <Fragment>
          <span className='warning'>{gradeLevel}</span> ({' '}
          <span className='warning'>{overallGrade}%</span> )
        </Fragment>
      )
    }

    return (
      <Fragment>
        <span className='error-message'>{gradeLevel}</span> ({' '}
        <span className='error-message'>{overallGrade}%</span> )
      </Fragment>
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
