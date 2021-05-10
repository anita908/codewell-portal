import React, { ChangeEvent, Component, ReactElement } from 'react'
import Dropdown from '../../Common/Form/Dropdown/Dropdown'
import FileForm from './Form/FileForm'
import Footer from '../../Common/Footer/Footer'
import SideNav from '../../Common/SideNav/SideNav'
import UrlForm from './Form/UrlForm'
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
  uploadFormat: string
}

const URL = 'Url'
const FILE = 'File'

class UploadAssignment extends Component<Props, State> {
  state = {
    uploadFormat: URL
  }

  render(): ReactElement {
    const { chapterName, homeworkId, lessonNumber, sessionId } = this.props.location.state
    const { uploadFormat } = this.state

    return (
      <div id='uploadAssignment'>
        <SideNav />
        <div className='uploadAssignment-content'>
          <h2>Lesson {lessonNumber}</h2>
          <h2>Upload {chapterName} Assignment</h2>
          <button className='uploadAssignment-back back' onClick={this.back} type='button'>
            Back
          </button>
          <div className='uploadAssignment-dropdown'>
            <Dropdown onChange={this.selectUploadFormat}>
              <option value={URL}>Url</option>
              <option value={FILE}>File</option>
            </Dropdown>
          </div>
          {uploadFormat === URL ? (
            <UrlForm homeworkId={homeworkId} sessionId={sessionId} />
          ) : (
            <FileForm homeworkId={homeworkId} sessionId={sessionId} />
          )}
        </div>
        <Footer />
      </div>
    )
  }

  back = (): void => {
    window.history.back()
  }

  selectUploadFormat = (event: ChangeEvent<HTMLSelectElement>): void => {
    const target = event.target as HTMLSelectElement
    this.setState({ uploadFormat: target.value })
  }
}

export default UploadAssignment
