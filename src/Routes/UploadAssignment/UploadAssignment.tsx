import React, { ChangeEvent, Component, ReactElement } from 'react'
import Dropdown from '../../Common/FormElements/Dropdown/Dropdown'
import Fetcher from 'Drivers/Fetcher'
import FileForm from './Form/FileForm'
import Footer from '../../Common/Footer/Footer'
import IChapterGradesModel from './Interfaces/IChapterGradesModel'
import IHomeworkProgress from 'Routes/Home/Interfaces/IHomeworkProgress'
import SideNav from '../../Common/SideNav/SideNav'
import UploadAssignmentPresenter from './UploadAssignmentPresenter'
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
  sessionGradesModel: IChapterGradesModel[]
  uploadFormat: string
}

const uploadAssignmentPresenter = new UploadAssignmentPresenter(new Fetcher())

const URL = 'Url'
const FILE = 'File'

class UploadAssignment extends Component<Props, State> {
  state = {
    sessionGradesModel: [],
    uploadFormat: URL
  }

  componentDidMount(): void {
    this.getChapterProgressModels()
  }

  render(): ReactElement {
    const { chapterName, homeworkId, lessonNumber, sessionId } = this.props.location.state
    const { sessionGradesModel, uploadFormat } = this.state

    return (
      <div id='uploadAssignment'>
        <SideNav username={localStorage.getItem('firstname') || ''} />
        <div className='uploadAssignment-content'>
          <h2>Lesson {lessonNumber}</h2>
          <h2>Upload {chapterName} Assignment</h2>
          <button className='uploadAssignment-back back' onClick={this.back} type='button'>
            Back
          </button>
          {sessionGradesModel.map((chapterProgress: IChapterGradesModel) => (
            <div key={chapterProgress.chapterId}>
              {chapterProgress.chapterNo === lessonNumber ? (
                <div>
                  {chapterProgress.homeworkProgress.map((homework: IHomeworkProgress) => (
                    <div key={homework.homeworkName}>
                      {homework.homeworkId === homeworkId ? (
                        <div>
                          {homework.submissionUrl ? (
                            <div className='uploadAssignment-message'>
                              <a>Your previous submission: </a>
                              <a target='_blank' rel='noreferrer' href={homework.submissionUrl}>
                                Submission
                              </a>
                              <a>
                                {' '}
                                at {new Date(homework.submissionDate).toLocaleDateString()}{' '}
                                {new Date(homework.submissionDate).toLocaleTimeString()}
                              </a>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
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

  async getChapterProgressModels(): Promise<void> {
    this.setState({
      sessionGradesModel: await uploadAssignmentPresenter.getSessionGradesModel()
    })
  }
}

export default UploadAssignment
