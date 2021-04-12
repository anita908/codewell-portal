import React, { Component, ReactElement } from 'react'
import { faCheck, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import DateHelper from 'Utilities/DateHelper'
import Fetcher from 'Drivers/Fetcher'
import GradeEditorPresenter from './GradeEditorPresenter'
import GradeHelper from 'Utilities/GradeHelper'
import IconButton from 'Common/Form/Button/IconButton'
import IEnrollment from './Interfaces/IEnrollment'
import IGrade from './Interfaces/IGrade'
import ToggleInput from 'Common/Form/Input/ToggleInput'
import './style.css'

type Props = {
  studentId: string
  sessionId: number
}

type State = {
  isLoadingGrades: boolean
  isUpdatingGrades: boolean
  enrollmentBackup: IEnrollment
  gradesBackup: IGrade[]
  editableEnrollment: IEnrollment
  editableGrades: IGrade[]
  editingRowId: number | null
}

const gradeEditorPresenter = new GradeEditorPresenter(new Fetcher())

class GradeEditor extends Component<Props, State> {
  state = {
    isLoadingGrades: false,
    isUpdatingGrades: false,
    enrollmentBackup: {} as IEnrollment,
    gradesBackup: [],
    editableEnrollment: {} as IEnrollment,
    editableGrades: [],
    editingRowId: null
  }

  componentDidMount = () => {
    this.getGrades(this.props.studentId, this.props.sessionId)
  }

  componentDidUpdate = (prevProps: Props) => {
    if (
      this.props.studentId !== prevProps.studentId ||
      this.props.sessionId !== prevProps.sessionId
    ) {
      this.getGrades(this.props.studentId, this.props.sessionId)
    }
  }

  render = (): ReactElement => {
    const {
      isLoadingGrades,
      isUpdatingGrades,
      editableGrades,
      editableEnrollment,
      editingRowId
    } = this.state

    return (
      <table className='gradeEditor-table'>
        <thead>
          <tr>
            <th>Homework Name</th>
            <th>Due Date</th>
            <th>Submitted</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        {!isLoadingGrades ? (
          <tbody>
            {editableGrades.map((grade: IGrade) => (
              <tr key={grade.id}>
                <td>{grade.homeworkName}</td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='date'
                    value={grade.dueDate || '--'}
                    onChange={(event) => this.updateGradeField(event.target.value, 'dueDate')}
                  />
                </td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='checkbox'
                    value={grade.submitted}
                    checked={grade.submitted === 'true' ? true : false}
                    onChange={(event) =>
                      this.updateGradeField(event.target.checked.toString(), 'submitted')
                    }
                  />
                </td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='number'
                    value={grade.score?.toString() || '--'}
                    onChange={(event) =>
                      this.updateGradeField(this.parseScore(event.target.value), 'score')
                    }
                  />
                  %
                </td>
                <td>
                  <IconButton
                    icon={faUserEdit}
                    className='edit-icon'
                    onClick={() => this.activateRowEdit(grade.id)}
                  />
                  <IconButton
                    icon={faCheck}
                    className='check-icon'
                    onClick={() => this.deactivateRowEdit(grade.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div>
            <p>Loading Grades...</p>
          </div>
        )}
        <tfoot>
          {!isLoadingGrades ? (
            <tr>
              <td>
                {'Current Chapter: '}
                <ToggleInput
                  active={editingRowId === 0}
                  type='number'
                  value={editableEnrollment.currentChapter}
                  onChange={(event) =>
                    this.updateEnrollmentField(
                      this.parseCurrentChapter(event.target.value),
                      'currentChapter'
                    )
                  }
                />
              </td>
              <td>
                {`Graduated: `}
                <ToggleInput
                  active={editingRowId === 0}
                  type='checkbox'
                  value={editableEnrollment.graduated}
                  checked={editableEnrollment.graduated === 'true' ? true : false}
                  onChange={(event) =>
                    this.updateEnrollmentField(event.target.checked.toString(), 'graduated')
                  }
                />
              </td>
              <td>
                {`Overall Grade: ${GradeHelper.determineGradeCategory(
                  editableEnrollment.overallGrade
                )} `}
                ({editableEnrollment.overallGrade}%)
              </td>
              <td>
                <IconButton
                  icon={faUserEdit}
                  className='edit-icon'
                  onClick={() => this.activateRowEdit(0)}
                />
                <IconButton
                  icon={faCheck}
                  className='check-icon'
                  onClick={() => this.deactivateRowEdit(0)}
                />
              </td>
            </tr>
          ) : null}
          <tr>
            <td colSpan={2}>
              <button
                className='gradeEditor-button save-button'
                onClick={this.updateStudentGrades}
                disabled={isUpdatingGrades || !!editingRowId}
              >
                Save
              </button>
            </td>
            <td colSpan={2}>
              <button className='gradeEditor-button reset-button' onClick={this.resetGradeEditor}>
                Reset
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    )
  }

  updateStudentGrades = async (): Promise<void> => {
    this.setState({ isUpdatingGrades: true })
    const { studentId, sessionId } = this.props
    const newGrades = JSON.parse(JSON.stringify(this.state.editableGrades))
    newGrades.forEach((grade: IGrade) => {
      if (grade.dueDate) {
        grade.dueDate = DateHelper.convertStringToMoment(grade.dueDate)?.format() as string
      } else {
        grade.dueDate = null
      }
    })
    await gradeEditorPresenter.updateEnrollmentRecord(this.state.editableEnrollment)
    const updatedGrades = await gradeEditorPresenter.updateStudentGrades(
      studentId,
      sessionId,
      newGrades
    )
    const updatedEnrollmentRecord = await gradeEditorPresenter.getEnrollmentRecord(
      studentId,
      sessionId
    )
    this.setState({
      enrollmentBackup: updatedEnrollmentRecord,
      gradesBackup: updatedGrades
    })
    this.resetGradeEditor()
    this.setState({ isUpdatingGrades: false })
  }

  updateGradeField = (value: string | number | null, key: string): void => {
    const gradesCopy = JSON.parse(JSON.stringify(this.state.editableGrades))
    const gradeObject = gradesCopy.find(
      (grade: IGrade) => grade.id === this.state.editingRowId
    ) as any
    if (gradeObject) {
      gradeObject[key] = value
      this.setState({ editableGrades: gradesCopy })
    }
  }

  updateEnrollmentField = (value: string | number, key: string): void => {
    this.setState({
      editableEnrollment: {
        ...this.state.editableEnrollment,
        [key]: value
      }
    })
  }

  parseScore = (score: string): number | null => {
    if (!score) {
      return null
    }
    const parsedScore = parseInt(score)
    if (parsedScore < 0) {
      return 0
    } else if (parsedScore > 100) {
      return 100
    } else {
      return parsedScore
    }
  }

  parseCurrentChapter = (chapterNo: string): number => {
    if (!chapterNo) {
      return this.state.editableEnrollment.currentChapter
    }
    const parsedChapterNo = parseInt(chapterNo)
    if (parsedChapterNo < 0) {
      return 0
    } else if (parsedChapterNo > this.state.editableGrades.length) {
      return this.state.editableGrades.length
    } else {
      return parsedChapterNo
    }
  }

  activateRowEdit = (gradeId: number): void => {
    this.setState({ editingRowId: gradeId })
  }

  deactivateRowEdit = (gradeId: number): void => {
    if (this.state.editingRowId === gradeId) {
      this.setState({ editingRowId: null })
    }
  }

  getGrades = async (studentId: string, sessionId: number): Promise<void> => {
    this.setState({ isLoadingGrades: true })
    const responses = await Promise.all([
      gradeEditorPresenter.getEnrollmentRecord(studentId, sessionId),
      gradeEditorPresenter.getStudentGrades(studentId, sessionId)
    ])
    this.setState({
      enrollmentBackup: responses[0],
      gradesBackup: responses[1]
    })
    this.resetGradeEditor()
    this.setState({ isLoadingGrades: false })
  }

  resetGradeEditor = (): void => {
    this.setState({
      editableGrades: this.mapGradesToEditable(this.state.gradesBackup),
      editableEnrollment: JSON.parse(JSON.stringify(this.state.enrollmentBackup)),
      editingRowId: null
    })
  }

  mapGradesToEditable = (grades: IGrade[]): IGrade[] => {
    const editableGrades = JSON.parse(JSON.stringify(grades))
    editableGrades.forEach((grade: IGrade) => {
      if (grade.dueDate) {
        grade.dueDate = DateHelper.convertStringToMoment(grade.dueDate)
          ?.format()
          .substring(0, 10) as string
      }
    })
    return editableGrades
  }
}

export default GradeEditor
