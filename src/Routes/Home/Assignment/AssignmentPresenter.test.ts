import AssignmentPresenter from './AssignmentPresenter'
import IAssignmentPresenter from './IAssignmentPresenter'
import IFetcher from '../../../Drivers/Interfaces/IFetcher'

function getMockData() {
  return [
    {
      id: 1,
      homeworkId: 3,
      name: 'Homework video 3-1',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-1.mp4'
    },
    {
      id: 2,
      homeworkId: 3,
      name: 'Homework video 3-2',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-2.mp4'
    },
    {
      id: 3,
      homeworkId: 3,
      name: 'Homework video 3-3',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-3.mp4'
    },
    {
      id: 4,
      homeworkId: 3,
      name: 'Homework video 3-4',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-4.mp4'
    },
    {
      id: 5,
      homeworkId: 3,
      name: 'Homework video 3-5',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+3/Homework+video+3-5.mp4'
    },
    {
      id: 7,
      homeworkId: 6,
      name: 'Homework video 6-1',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-1.mp4'
    },
    {
      id: 8,
      homeworkId: 6,
      name: 'Homework video 6-2',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-2.mp4'
    },
    {
      id: 9,
      homeworkId: 6,
      name: 'Homework video 6-3',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-3.mp4'
    },
    {
      id: 10,
      homeworkId: 6,
      name: 'Homework video 6-4',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-4.mp4'
    },
    {
      id: 11,
      homeworkId: 6,
      name: 'Homework video 6-5',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-5.mp4'
    },
    {
      id: 12,
      homeworkId: 6,
      name: 'Homework video 6-6',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-6.mp4'
    },
    {
      id: 13,
      homeworkId: 6,
      name: 'Homework video 6-7',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-7.mp4'
    },
    {
      id: 14,
      homeworkId: 6,
      name: 'Homework video 6-8',
      storageUrl:
        'https://codewell-homework-videos.s3.us-east-2.amazonaws.com/Lesson+6/Homework+video+6-8.mp4'
    }
  ]
}

describe('Test assignment presenter', () => {
  const courseId: number = 1
  let fetcher: IFetcher
  let mockAssignmentDataStore: any
  let presenter: IAssignmentPresenter
  beforeEach(() => {
    fetcher = {
      fetch: jest.fn()
    }

    mockAssignmentDataStore = {
      getAssignmentInstructionVideosByCourseId: jest.fn(),
      getHomeworkVideosByCourseId: jest.fn()
    }
  })

  it('Should be able to handle failed request', async () => {
    fetcher.fetch = jest.fn().mockReturnValue(null)
    mockAssignmentDataStore.getHomeworkVideosByCourseId = jest.fn()
    presenter = new AssignmentPresenter(mockAssignmentDataStore)
    const response = await presenter.getHomeworkVideosByCourseId(courseId)

    expect(response).toEqual([])
  })
})
