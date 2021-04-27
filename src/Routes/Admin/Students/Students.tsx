import React, { ChangeEvent, Component, MouseEvent, ReactElement } from 'react'
import DateHelper from 'Utilities/DateHelper'
import Fetcher from 'Drivers/Fetcher'
import Footer from 'Common/Footer'
import GradeEditor from './GradeEditor/GradeEditor'
import ISession from './Interfaces/ISession'
import IStudent from './Interfaces/IStudent'
import Select from 'Common/Form/Select/Select'
import SideNav from 'Common/SideNav'
import StudentsPresenter from './StudentsPresenter'
import './style.css'

type State = {
  isLoadingStudents: boolean
  selectedSessionId: number
  selectedStudentId: string
  taughtSessions: ISession[]
  students: IStudent[]
}

const studentsPresenter = new StudentsPresenter(new Fetcher())

class Students extends Component<{}, State> {
  state = {
    isLoadingStudents: false,
    selectedSessionId: 0,
    selectedStudentId: '',
    taughtSessions: [],
    students: []
  }

  componentDidMount = (): void => {
    this.getAllStudents()
  }

  render = (): ReactElement => {
    const {
      isLoadingStudents,
      selectedSessionId,
      selectedStudentId,
      taughtSessions,
      students
    } = this.state

    return (
      <div id='students'>
        <SideNav isAdmin={true} />
        <div className='students-content'>
          <h3>Students</h3>
          <div className='students-sessionSelect'>
            <label>Session:</label>
            <Select size='md' value={selectedSessionId} onChange={this.selectSession}>
              {taughtSessions.map((session: ISession) => (
                <option key={session.id} value={session.id}>
                  {`${session.course.name}: ${session.beginDate} - ${session.endDate}`}
                </option>
              ))}
            </Select>
          </div>
          <div className='students-contentFlex'>
            <div className='students-container'>
              <table className='students-table'>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Birthdate</th>
                    <th>City</th>
                    <th>State</th>
                  </tr>
                </thead>
                {!isLoadingStudents ? (
                  <tbody>
                    {students.map((student: IStudent) => (
                      <tr
                        key={student.id}
                        className='students-row'
                        onClick={(event) => this.selectStudent(student.userId, event)}
                      >
                        <td>
                          {student.firstName} {student.lastName}
                        </td>
                        <td>{student.birthdate}</td>
                        <td>{student.city}</td>
                        <td>{student.state}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div>
                    <p>Loading Students...</p>
                  </div>
                )}
              </table>
            </div>
            <div className='grades-container'>
              {selectedSessionId && selectedStudentId ? (
                <GradeEditor studentId={selectedStudentId} sessionId={selectedSessionId} />
              ) : (
                <div>
                  <p>Select a student</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  selectSession = async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const sessionId = parseInt(event.target.value)
    this.setState({
      isLoadingStudents: true,
      selectedSessionId: sessionId
    })
    const students = await studentsPresenter.getStudentsInSession(sessionId)
    this.setState({
      isLoadingStudents: false,
      students: students
    })
  }

  selectStudent = (studentId: string, event: MouseEvent<HTMLTableRowElement>): void => {
    this.setState({
      selectedStudentId: studentId
    })
    this.toggleActiveRow(event.target as HTMLTableDataCellElement)
  }

  getAllStudents = async (): Promise<void> => {
    this.setState({ isLoadingStudents: true })
    const taughtSessions = await studentsPresenter.getTaughtSessions()
    taughtSessions.forEach((session: ISession) => {
      session.beginDate = DateHelper.convertStringToMoment(session.beginDate)?.format(
        'MM/DD/YYYY'
      ) as string
      session.endDate = DateHelper.convertStringToMoment(session.endDate)?.format(
        'MM/DD/YYYY'
      ) as string
    })
    this.setState({
      selectedSessionId: taughtSessions[0].id,
      taughtSessions: taughtSessions
    })
    if (taughtSessions.length > 0) {
      const students = await studentsPresenter.getStudentsInSession(taughtSessions[0].id)
      students.forEach((student: IStudent) => {
        student.birthdate = DateHelper.convertStringToMoment(student.birthdate)?.format(
          'MM/DD/YYYY'
        ) as string
      })
      this.setState({
        isLoadingStudents: false,
        students: students
      })
    }
  }

  toggleActiveRow = (target: HTMLTableDataCellElement): void => {
    const row = target.parentElement
    const siblingRows = row?.parentElement?.children || []
    Array.from(siblingRows).forEach((siblingRow) => {
      siblingRow.classList.toggle('active', false)
    })
    row?.classList.toggle('active', true)
  }
}

export default Students
