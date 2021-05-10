import React, { ChangeEvent, Component, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import UploadAssignmentPresenter from '../UploadAssignmentPresenter'

type Props = {
  homeworkId: number
  sessionId: number
}

type State = {
  file: File | null
  isErrorStatus: boolean
  isLoading: boolean
  responseMessage: string
}

const uploadAssignmentPresenter = new UploadAssignmentPresenter(new Fetcher())

class FileForm extends Component<Props, State> {
  state = {
    file: null,
    isErrorStatus: false,
    isLoading: false,
    responseMessage: ''
  }

  render(): ReactElement {
    const { file, isErrorStatus, isLoading, responseMessage } = this.state

    return (
      <div>
        <p className={isErrorStatus ? 'error' : 'success'}>{responseMessage}</p>
        <label className='inputLabel'>Assignment File:</label>
        <br />
        <br />
        <input
          accept='.doc,.docx,.pdf'
          className='uploadAssignment-file'
          type='file'
          name='file'
          onChange={this.selectFile}
        />
        <div>
          <button
            className='button settings-saveChanges'
            disabled={isLoading || !file}
            onClick={this.uploadFile}
          >
            Upload
          </button>
        </div>
      </div>
    )
  }

  selectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files
    if (files && files.length > 0) {
      this.setState({ file: files[0] })
    }
  }

  uploadFile = async (): Promise<void> => {
    this.setState({ isLoading: true })
    if (this.state.file) {
      const { homeworkId, sessionId } = this.props
      const response = await uploadAssignmentPresenter.uploadAssignmentFile(
        homeworkId,
        sessionId,
        this.state.file as any
      )
      if (response.errorMessage) {
        this.setState({
          isErrorStatus: true,
          responseMessage: 'Unexpected error has occurred.'
        })
      } else {
        this.setState({
          isErrorStatus: false,
          responseMessage: response.message
        })
      }
    }
    this.setState({ isLoading: false })
  }
}

export default FileForm
