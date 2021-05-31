import React, { Component, ReactElement } from 'react'
import DateHelper from 'Utilities/DateHelper'
import Fetcher from 'Drivers/Fetcher'
import Footer from 'Common/Footer'
import GradeEditor from './GradeEditor/GradeEditor'
import IAdminSession from './Interfaces/IAdminSession'
import IStudent from './Interfaces/IStudent'
import Select from 'Common/FormElements/Select/Select'
import SideNav from 'Common/SideNav'
import StudentsPresenter from './StudentsPresenter'
import './style.css'

type State = {
  selectedSessionId: number
  selectedStudentId: string
  taughtSessions: IAdminSession[]
  students: IStudent[]
}

const studentsPresenter = new StudentsPresenter(new Fetcher())

class Students extends Component<{}, State> {
  state = {
    selectedSessionId: -1,
    selectedStudentId: '',
    taughtSessions: [],
    students: [],
    showGradesEditor: false
  }

  componentDidMount = (): void => {
    this.getAllStudents()
  }

  render = (): ReactElement => {
    const { selectedSessionId, selectedStudentId, taughtSessions, students } = this.state

    return (
      <div id='students'>
        <SideNav isAdmin={true} username={localStorage.getItem('firstname') || ''} />
        <div className='students-content'>
          <h3>Students</h3>
          <div className='students-sessionSelectContainer'>
            <label>Session:</label>
            <Select
              size='md'
              classname='students-sessionDropdown'
              value={selectedSessionId}
              onChange={this.selectSession}
            >
              <option>Select a course session</option>
              {taughtSessions.map((session: IAdminSession) => (
                <option key={session.id} value={session.id}>
                  {`${session.course.name}: ${session.beginDate} - ${session.endDate}`}
                </option>
              ))}
            </Select>
          </div>
          <div className='students-studentDropdownContainer'>
            <label>Student Name: </label>
            <Select classname='students-studentDropdown' size='md' onChange={this.selectStudent}>
              <option>Select a student name</option>
              {students.map((student: IStudent) => (
                <option key={student.userId} value={student.userId}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </Select>
          </div>
          <div className='grades-container'>
            <GradeEditor studentId={selectedStudentId} sessionId={selectedSessionId} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  getStudentState = (state: string): string => {
    if (state.toLocaleLowerCase().includes('cali')) {
      return 'CA'
    } else if (state.toLocaleLowerCase().includes('york')) {
      return 'NY'
    }

    return state
  }

  selectSession = async (event: React.ChangeEvent): Promise<void> => {
    const target = event.target as HTMLInputElement
    const sessionId = parseInt(target.value)

    this.setState({
      selectedSessionId: sessionId
    })
    const students = await studentsPresenter.getStudentsInSession(sessionId)
    this.setState({
      students: students
    })
  }

  selectStudent = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLInputElement
    const selectedStudentId = target.value

    this.setState({
      selectedStudentId
    })
  }

  getAllStudents = async (): Promise<void> => {
    const taughtSessions = await this.getTaughtSessions()

    if (taughtSessions.length > 0) {
      this.setState({
        taughtSessions: taughtSessions
      })

      const students = await studentsPresenter.getStudentsInSession(taughtSessions[0].id)
      students.forEach((student: IStudent) => {
        student.birthdate = DateHelper.convertStringToMoment(student.birthdate)?.format(
          'MM/DD/YYYY'
        ) as string
      })
      this.setState({
        students: students
      })
    }
  }

  getTaughtSessions = async (): Promise<IAdminSession[]> => {
    const taughtSessions = await studentsPresenter.getTaughtSessions()

    return taughtSessions.map((session: IAdminSession) => {
      session.beginDate = DateHelper.convertStringToMoment(session.beginDate)?.format(
        'MM/DD/YYYY'
      ) as string
      session.endDate = DateHelper.convertStringToMoment(session.endDate)?.format(
        'MM/DD/YYYY'
      ) as string

      return session
    })
  }
}

export default Students
