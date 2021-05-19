import React, { ChangeEvent, Component, ReactElement } from 'react'
import Fetcher from 'Drivers/Fetcher'
import UploadAssignmentPresenter from '../UploadAssignmentPresenter'
import UrlHelper from 'Utilities/UrlHelper'
import './style.css'

type Props = {
  homeworkId: number
  sessionId: number
}

type State = {
  isErrorStatus: boolean
  isLoading: boolean
  responseMessage: string
  url: string
}

const uploadAssignmentPresenter = new UploadAssignmentPresenter(new Fetcher())

class UrlForm extends Component<Props, State> {
  state = {
    isLoading: false,
    isErrorStatus: false,
    responseMessage: '',
    url: ''
  }

  render(): ReactElement {
    const { isErrorStatus, isLoading, responseMessage, url } = this.state

    return (
      <div>
        <p className={isErrorStatus ? 'error' : 'success'}>{responseMessage}</p>
        <label className='inputLabel'>Assignment Link:</label>
        <div className='inputWrapper'>
          <input
            className='input'
            onChange={this.updateUrl}
            required={true}
            type='string'
            value={url}
          />
        </div>
        <div>
          <button
            className='button settings-saveChanges'
            disabled={isLoading || !url}
            onClick={this.uploadUrl}
          >
            Upload
          </button>
        </div>
      </div>
    )
  }

  updateUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ url: event.target.value })
  }

  uploadUrl = async (): Promise<void> => {
    this.setState({ isLoading: true })
    if (UrlHelper.isValidUrl(this.state.url)) {
      const { homeworkId, sessionId } = this.props
      const response = await uploadAssignmentPresenter.uploadAssignmentLink(
        homeworkId,
        sessionId,
        this.state.url
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
    } else {
      this.setState({
        isErrorStatus: true,
        responseMessage: 'Please submit a valid url.'
      })
    }
    this.setState({ isLoading: false })
  }
}

export default UrlForm
