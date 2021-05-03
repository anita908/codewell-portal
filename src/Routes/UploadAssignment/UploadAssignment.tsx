import React, { Component, ReactElement } from 'react'
import Dropdown from './Dropdown/Dropdown'
import Fetcher from 'Drivers/Fetcher'
import Footer from '../../Common/Footer/Footer'
import Option from './Option/Option'
import SideNav from '../../Common/SideNav/SideNav'
import UploadAssignmentPresenter from './UploadAssignmentPresenter'
import './style.css'

type Props = {
  location: {
    state: {
      chapterName: string
      homeworkId: number
      lessonNumber: number
      sessionId: number
    }
  }
}

type State = {
  assignmentUrl: string
  errorMessage: string
  isLoading: boolean
  successMessage: string
  assignmentFile: FileList | null
  assignmentType: string
}

const uploadAssignmentPresenter = new UploadAssignmentPresenter(new Fetcher())
class UploadAssignment extends Component<Props, State> {
  state = {
    assignmentUrl: '',
    errorMessage: '',
    isLoading: false,
    successMessage: '',
    assignmentFile: null,
    assignmentType: 'Link'
  }

  render(): ReactElement {
    const { chapterName } = this.props.location.state
    const { assignmentUrl, errorMessage, isLoading, successMessage, assignmentType } = this.state

    return (
      <div id='uploadAssignment'>
        <SideNav />
        <div className='uploadAssignment-content'>
          <h2>Upload {chapterName} Assignment</h2>
          <p className='error'>{errorMessage}</p>
          <p className='success'>{successMessage}</p>
          <button className='uploadAssignment-back back' onClick={this.back} type='button'>
            Back
          </button>
          <div className='uploadAssignment-dropdown'>
            <Dropdown onChange={this.handleSelect}>
              <Option selected value='Choose homework type' />
              <Option value='Link' />
              <Option value='File' />
            </Dropdown>
          </div>
          {assignmentType === 'Link' ? (
            <div>
              <label htmlFor='homeworkUrl' className='inputLabel'>
                Assignment Link:{' '}
              </label>
              <div className='inputWrapper'>
                <input
                  className='input'
                  id='assignmentkurl'
                  onChange={this.updateInputField}
                  required={true}
                  type='string'
                  value={assignmentUrl}
                />
              </div>
              <div>
                <button
                  className='button settings-saveChanges'
                  disabled={isLoading}
                  onClick={this.uploadAssignmentFile}
                  type='submit'
                >
                  Upload
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor='homeworkUrl' className='inputLabel'>
                Assignment File:
              </label>
              <br />
              <br />
              <input
                className='uploadAssignment-file'
                type='file'
                name='file'
                onChange={this.updateFile}
              />
              <div>
                <button
                  className='button settings-saveChanges'
                  disabled={isLoading}
                  onClick={this.uploadAssignmentFile}
                  type='submit'
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  back = (): void => {
    window.history.back()
  }

  handleSelect = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLInputElement
    this.setState({ assignmentType: target.value })
  }

  uploadAssignmentLink = async (): Promise<void> => {
    const { homeworkId, sessionId } = this.props.location.state
    const { assignmentUrl } = this.state
    this.setState({ isLoading: true })

    if (this.isValidLink()) {
      const result = await uploadAssignmentPresenter.uploadAssignmentLink({
        sessionId,
        homeworkId,
        assignmentUrl
      })

      if (result) {
        this.setState({ errorMessage: '', successMessage: 'Successfully uploaded assignment' })
      }
    } else {
      this.setState({
        errorMessage: 'Please enter valid assignment link.',
        isLoading: false,
        successMessage: ''
      })
    }

    this.setState({ isLoading: false })
  }

  uploadAssignmentFile = async (): Promise<void> => {
    const { homeworkId, sessionId } = this.props.location.state
    const { assignmentFile } = this.state
    this.setState({ isLoading: true })

    if (this.isValidLink()) {
      const result = await uploadAssignmentPresenter.uploadAssignmentFile({
        sessionId,
        homeworkId,
        assignmentFile
      })

      if (result) {
        this.setState({ errorMessage: '', successMessage: 'Successfully uploaded assignment' })
      }
    }

    this.setState({ isLoading: false })
  }

  isValidLink = (): boolean => {
    const { assignmentUrl } = this.state

    return !!assignmentUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
  }

  updateInputField = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLInputElement
    this.setState({ assignmentUrl: target.value })
  }

  updateFile = (event: React.ChangeEvent): void => {
    const files = (event.target as HTMLInputElement).files
    console.log(files)
    this.setState({ assignmentFile: files })
  }
}

export default UploadAssignment
