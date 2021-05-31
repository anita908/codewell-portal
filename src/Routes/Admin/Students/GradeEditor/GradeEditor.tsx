/* eslint-disable prettier/prettier */
import React, { Component, ReactElement } from 'react'
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { faCheck, faUserEdit, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import DateHelper from 'Utilities/DateHelper'
import Fetcher from 'Drivers/Fetcher'
import GradeHelper from 'Utilities/GradeHelper'
import IconButton from 'Common/FormElements/Button/IconButton'
import ToggleInput from 'Common/FormElements/Input/ToggleInput'
import GradeEditorPresenter from './GradeEditorPresenter'
import IEnrollment from './Interfaces/IEnrollment'
import IGrade from './Interfaces/IGrade'
import './style.css'

const Swal = withReactContent(swal)

type Props = {
  studentId: string
  sessionId: number
}

type State = {
  comment: object
  editableEnrollment: IEnrollment
  editableGrades: IGrade[]
  editingRowId: number | null
  enrollmentBackup: IEnrollment
  gradesBackup: IGrade[]
  isLoadingGrades: boolean
  isUpdatingGrades: boolean
}

const gradeEditorPresenter = new GradeEditorPresenter(new Fetcher())

class GradeEditor extends Component<Props, State> {
  state = {
    comment: { id: null, comment: '' },
    gradesBackup: [],
    enrollmentBackup: {} as IEnrollment,
    editableEnrollment: {} as IEnrollment,
    editableGrades: [],
    editingRowId: null,
    isLoadingGrades: false,
    isUpdatingGrades: false
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
      editableGrades,
      editableEnrollment,
      editingRowId,
      isUpdatingGrades,
      isLoadingGrades
    } = this.state

    return (
      <table className='gradeEditor-table'>
        <thead>
          <tr>
            <th>Homework Title</th>
            <th>Due Date</th>
            <th>Submitted</th>
            <th>Submission Link</th>
            <th>Submission Date</th>
            <th>Score</th>
            <th>Feedback</th>
            <th></th>
          </tr>
        </thead>
          <tbody>
            {editableGrades.map((grade: IGrade) => (
              <tr key={grade.id}>
                <td>{grade.homeworkName}</td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='date'
                    value={grade.dueDate || '--'}
                    onChange={event => this.updateGradeField(event.target.value, 'dueDate')}
                  />
                </td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='checkbox'
                    value={grade.submitted}
                    checked={grade.submitted === 'true'}
                    onChange={event =>
                      this.updateGradeField(event.target.checked.toString(), 'submitted')
                    }
                  />
                </td>
                <td>{grade.submissionUrl ? <a href={grade.submissionUrl}>Submission</a> : '--'}</td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='date'
                    value={grade.submissionDate || '--'}
                    onChange={event => this.updateGradeField(event.target.value, 'submissionDate')}
                  />
                </td>
                <td>
                  <ToggleInput
                    active={editingRowId === grade.id}
                    type='number'
                    value={grade.score?.toString() || '--'}
                    onChange={event =>
                      this.updateGradeField(this.parseScore(event.target.value), 'score')
                    }
                  />
                  %
                </td>
                <td>
                  <IconButton
                    disabled={this.shouldDisableCommentEditor(grade.id)}
                    icon={faCommentAlt}
                    className='comment-icon'
                    onClick={() => this.openCommentEditor(grade.id)}
                  />
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
        <tfoot>
          {!isLoadingGrades && (
            <tr>
              <td>
                {'Current Chapter: '}
                <ToggleInput
                  active={editingRowId === 0}
                  type='number'
                  value={editableEnrollment.currentChapter}
                  onChange={event =>
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
                  checked={editableEnrollment.graduated === 'true'}
                  onChange={event =>
                    this.updateEnrollmentField(event.target.checked.toString(), 'graduated')
                  }
                />
              </td>
              <td>
                {`Withdrawn: `}
                <ToggleInput
                  active={editingRowId === 0}
                  type='checkbox'
                  value={editableEnrollment.withdrawn}
                  checked={editableEnrollment.withdrawn === 'true'}
                  onChange={event =>
                    this.updateEnrollmentField(event.target.checked.toString(), 'withdrawn')
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
          )}
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

  shouldDisableCommentEditor = (gradeId: number): boolean => {
    const { editingRowId } = this.state

    if (editingRowId) {
      return editingRowId !== gradeId
    }

    return !this.hasNoSavedComment()
  }

  openCommentEditor = async (gradeId: number): Promise<void> => {
    const { comment, editingRowId } = this.state
    if (this.hasNoSavedComment() || this.hasSavedCommentForSelectedGrade(gradeId)) {
      await Swal.fire({
        input: 'textarea',
        inputLabel: 'Please leave comment below',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        inputValue: comment.comment || '',
        showCancelButton: true
      }).then(async result => {
        if (result.isConfirmed) {
          const gradesCopy = JSON.parse(JSON.stringify(this.state.editableGrades))
          const gradeObject = gradesCopy.find((grade: IGrade) => grade.id === gradeId) as IGrade

          if (gradeObject) {
            gradeObject.feedback = result.value
            this.setState({
              comment: { id: editingRowId, comment: result.value },
              editableGrades: gradesCopy
            })
          }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved: ', `${result.isDenied}`)
        }
      })
    }
  }

  hasNoSavedComment = (): boolean => {
    const { comment, editingRowId } = this.state
    return !comment.id && !comment.comment && !!editingRowId
  }

  hasSavedCommentForSelectedGrade = (gradeId: number): boolean => {
    const { comment, editingRowId } = this.state

    return comment.id === editingRowId && editingRowId === gradeId && editingRowId !== null
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
      if (grade.submissionDate) {
        grade.submissionDate = DateHelper.convertStringToMoment(
          grade.submissionDate
        )?.format() as string
      } else {
        grade.submissionDate = null
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
    }
    if (parsedScore > 100) {
      return 100
    }
    return parsedScore
  }

  parseCurrentChapter = (chapterNo: string): number => {
    if (!chapterNo) {
      return this.state.editableEnrollment.currentChapter
    }
    const parsedChapterNo = parseInt(chapterNo)
    if (parsedChapterNo < 0) {
      return 0
    }
    if (parsedChapterNo > this.state.editableGrades.length) {
      return this.state.editableGrades.length
    }
    return parsedChapterNo
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
      if (grade.submissionDate) {
        grade.submissionDate = DateHelper.convertStringToMoment(grade.submissionDate)
          ?.format()
          .substring(0, 10) as string
      }
    })
    return editableGrades
  }
}

export default GradeEditor
