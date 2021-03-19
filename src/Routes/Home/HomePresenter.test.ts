import IFetcher from 'Drivers/Interfaces/IFetcher'
import HomePresenter from './HomePresenter'
import IHomePresenter from './IHomePresenter'

const userData = {
  userData: {
    id: 4,
    userId: '4894b7cd-7b95-4cbd-a157-d253dd10eb24',
    firstName: 'Sunny',
    lastName: 'Yang',
    age: 8,
    city: 'Provo',
    isAdmin: 'true'
  },
  enrolledSessions: [
    {
      enrollmentId: 4,
      sessionId: 1,
      courseId: 1,
      courseName: 'P5.js Introductory Course',
      enrollDate: '2021-03-12T05:32:27Z',
      beginDate: '2021-04-05T00:00:00Z',
      endDate: '2021-06-03T00:00:00Z',
      graduated: 'false',
      overallGrade: 100.0,
      sessionProgressModel: [
        {
          chapterId: 1,
          chapterNo: 1,
          chapterName: 'Keyboard Basics',
          homeworkId: 1,
          homeworkName: 'Paragraph Exercise',
          homeworkLink: null,
          homeworkScore: null,
          activities: []
        },
        {
          chapterId: 2,
          chapterNo: 2,
          chapterName: 'Coordinates',
          homeworkId: 2,
          homeworkName: 'Stock the Shelves',
          homeworkLink: null,
          homeworkScore: null,
          activities: []
        },
        {
          chapterId: 3,
          chapterNo: 3,
          chapterName: 'P5.js Basics: Shapes and Colors',
          homeworkId: 3,
          homeworkName: 'House and Landscape',
          homeworkLink: null,
          homeworkScore: null,
          activities: []
        },
        {
          chapterId: 4,
          chapterNo: 4,
          chapterName: 'P5.js Basics: Environment Variables and Events',
          homeworkId: 4,
          homeworkName: 'Multicolor Palette',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 1,
              courseId: 1,
              chapterNo: 4,
              name: 'Drawing Pen',
              link: 'https://editor.p5js.org/codewelllearning/sketches/HILEmt0n7'
            },
            {
              id: 2,
              courseId: 1,
              chapterNo: 4,
              name: 'Two-color Palette',
              link: 'https://editor.p5js.org/codewelllearning/sketches/5V2RSqMZC'
            }
          ]
        },
        {
          chapterId: 5,
          chapterNo: 5,
          chapterName: 'Data Types and Variables',
          homeworkId: 5,
          homeworkName: 'Pizza Shop',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 3,
              courseId: 1,
              chapterNo: 5,
              name: 'Rainy Story',
              link: 'https://editor.p5js.org/codewelllearning/sketches/y81C3vMl2'
            },
            {
              id: 4,
              courseId: 1,
              chapterNo: 5,
              name: 'Moving Shapes',
              link: 'https://editor.p5js.org/codewelllearning/sketches/w4gU-_RjT'
            }
          ]
        },
        {
          chapterId: 6,
          chapterNo: 6,
          chapterName: 'Arrays and Objects',
          homeworkId: 6,
          homeworkName: 'Solar System',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 5,
              courseId: 1,
              chapterNo: 6,
              name: 'Colored Circles Array',
              link: 'https://editor.p5js.org/codewelllearning/sketches/XZF8ec7H_'
            },
            {
              id: 6,
              courseId: 1,
              chapterNo: 6,
              name: 'Colored Circles Objects',
              link: 'https://editor.p5js.org/codewelllearning/sketches/VVHa7k3kF'
            },
            {
              id: 7,
              courseId: 1,
              chapterNo: 6,
              name: 'Planets',
              link: 'https://editor.p5js.org/codewelllearning/sketches/J2dsC5byR'
            }
          ]
        },
        {
          chapterId: 7,
          chapterNo: 7,
          chapterName: 'Conditionals',
          homeworkId: 7,
          homeworkName: 'Conditional Mickey',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 8,
              courseId: 1,
              chapterNo: 7,
              name: 'Score Analyzer',
              link: 'https://editor.p5js.org/codewelllearning/sketches/bh0B_Veo-'
            }
          ]
        },
        {
          chapterId: 8,
          chapterNo: 8,
          chapterName: 'Game Design: Snake',
          homeworkId: 8,
          homeworkName: 'Snake',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 9,
              courseId: 1,
              chapterNo: 8,
              name: 'Snake Part 1',
              link: 'https://editor.p5js.org/codewelllearning/sketches/2Vswtf02k'
            }
          ]
        },
        {
          chapterId: 9,
          chapterNo: 9,
          chapterName: 'Midterm Review and Exam',
          homeworkId: 9,
          homeworkName: 'Midterm Quiz',
          homeworkLink: null,
          homeworkScore: null,
          activities: []
        },
        {
          chapterId: 10,
          chapterNo: 10,
          chapterName: 'Midterm Project: Maze',
          homeworkId: 10,
          homeworkName: 'Maze',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 10,
              courseId: 1,
              chapterNo: 10,
              name: 'Maze Part 1',
              link: 'https://editor.p5js.org/codewelllearning/sketches/kRGhNF3EE'
            }
          ]
        },
        {
          chapterId: 11,
          chapterNo: 11,
          chapterName: 'Loops',
          homeworkId: 11,
          homeworkName: 'For Loop Homework',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 11,
              courseId: 1,
              chapterNo: 11,
              name: 'Looped Shapes',
              link: 'https://editor.p5js.org/codewelllearning/sketches/XtzRKk-gX'
            }
          ]
        },
        {
          chapterId: 12,
          chapterNo: 12,
          chapterName: 'Game Design: Loop Project',
          homeworkId: 12,
          homeworkName: 'For Loop Project',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 12,
              courseId: 1,
              chapterNo: 12,
              name: 'Loop Project Part 1',
              link: ''
            }
          ]
        },
        {
          chapterId: 13,
          chapterNo: 13,
          chapterName: 'Functions',
          homeworkId: 13,
          homeworkName: 'American Flag',
          homeworkLink: null,
          homeworkScore: null,
          activities: []
        },
        {
          chapterId: 14,
          chapterNo: 14,
          chapterName: 'Game Design: Balloon Popping',
          homeworkId: 14,
          homeworkName: 'Balloon Popping',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 13,
              courseId: 1,
              chapterNo: 14,
              name: 'Balloon Popping Part 1',
              link: 'https://editor.p5js.org/codewelllearning/sketches/l2SCsLA50'
            }
          ]
        },
        {
          chapterId: 15,
          chapterNo: 15,
          chapterName: 'Final Review',
          homeworkId: 15,
          homeworkName: 'Final Quiz',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 14,
              courseId: 1,
              chapterNo: 15,
              name: 'Kahoot Class Review',
              link: ''
            }
          ]
        },
        {
          chapterId: 16,
          chapterNo: 16,
          chapterName: 'Final Project: Space Invaders',
          homeworkId: 16,
          homeworkName: 'Space Invaders',
          homeworkLink: null,
          homeworkScore: null,
          activities: [
            {
              id: 15,
              courseId: 1,
              chapterNo: 16,
              name: 'Space Invaders Part 1',
              link: ''
            }
          ]
        }
      ]
    }
  ]
}

function getMockData() {
  return userData
}

describe('Test home presenter', () => {
  let presenter: IHomePresenter
  let mockFetcher: IFetcher
  beforeEach(() => {
    mockFetcher = {
      fetch: jest.fn()
    }
  })

  it('Should be able to send request to get home data', async () => {
    mockFetcher.fetch = jest.fn().mockReturnValue(getMockData())

    presenter = new HomePresenter(mockFetcher)
    await presenter.getHomeData()

    expect(mockFetcher.fetch).toHaveBeenCalled()
    expect(presenter.firstName).toEqual('Sunny')
    expect(presenter.lessons.length).toBe(16)
    expect(presenter.sessions.length).toBe(1)
  })

  it('Should be able to handle invalid request ', async () => {
    mockFetcher.fetch = jest.fn().mockReturnValue(null)
    presenter = new HomePresenter(mockFetcher)
    await presenter.getHomeData()

    expect(mockFetcher.fetch).toHaveBeenCalled()
    expect(presenter.firstName).toEqual('user')
    expect(presenter.lessons).toEqual([])
    expect(presenter.sessions).toEqual([])
  })
})
