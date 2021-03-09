import { homeData } from '../../Utilities/Url'
import IFetcher from '../../Drivers/Interfaces/IFetcher'

const mockData = {
  userData: {
    id: 1,
    userId: '613ac911-e200-4f25-b7b9-184be969f6f5',
    username: null, // why is user name null?
    email: 'johnnypao43@gmail.com',
    password: null,
    firstName: 'Johnny',
    lastName: 'Pao',
    age: 8,
    city: 'Provo',
    isAdmin: 'false'
  },
  enrolledSessions: [
    {
      session: {
        lessons: [
          {
            lessonNumber: 1,
            name: 'P5.js Introductory Course',
            assignmentName: 'Introductory Game',
            assignmentLink: 'assignment url',
            // ageLower: 8, not sure why we need age boundary for student portal
            // ageUpper: 12,
            inClassActivityName: 'In Class Activity',
            activityLink: 'activity url',
            // price: 200.0,
            grade: 80
          },
          {
            lessonNumber: 2,
            name: 'X, Y Coordinate',
            assignmentName: 'Refrigerator!',
            assignmentLink: 'assignment url',
            // ageLower: 8, not sure why we need age boundary for student portal
            // ageUpper: 12,
            inClassActivityName: 'Mouse Position',
            activityLink: 'activity url',
            // price: 200.0,
            grade: 90
          },
          {
            lessonNumber: 7,
            name: 'Conditional: If-else and switch statement',
            assignmentName: 'Snake II',
            assignmentLink: 'assignment url',
            // ageLower: 8, not sure why we need age boundary for student portal
            // ageUpper: 12,
            inClassActivityName: 'Score Analyzer',
            activityLink: 'activity url',
            // price: 200.0,
            grade: 98.2
          }
        ],
        beginDate: '2021-04-04T18:00:00-06:00',
        endDate: '2021-06-02T18:00:00-06:00'
      },
      enrollDate: '2021-03-05T20:08:56-07:00',
      graduated: 'false',
      overallGrade: 100.0
    }
  ]
}

class HomePresenter {
  private readonly fetcher: IFetcher
  private _firstName: string
  private _sessions: any[]

  constructor(fetcher: IFetcher) {
    this.fetcher = fetcher
    this._firstName = ''
    this._sessions = []
  }

  public get firstName(): string {
    return this._firstName
  }

  public get sessions(): any[] {
    return this._sessions
  }

  public async getHomeData(): Promise<void> {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzYWx0IjoiOTcxYWM4MGUtNzAxZi00ZjYzLWIyN2MtMzY2NzE5N2FjYTQxIiwiaXNzIjoiY29kZXdlbGwtc2VydmVyIiwidXNlcklkIjoiNTBlZDJiZjgtY2U3MS00MWI0LWFiYzctYTEwMWRiZjlmZmI1IiwiZXhwaXJhdGlvbkRhdGUiOiIyMDIxLTAzLTE2VDExOjI2OjIxLjEzMjIwMC0wNzowMCJ9.GvyPtiX0AdZ1ZshiBvzfovXiJsL2PrXy8iYr4IN4Udw'
    const response = await this.fetcher.fetch(
      {
        body: {},
        method: 'GET',
        url: homeData
      },
      `Bearer ${token}`
    )
    console.log('response ', response)

    // if (response) {
    this._firstName = 'Johnny'
    // this._firstName = mockData.userData.firstName
    // this._sessions = mockData.enrolledSessions[0].session.lessons
    // }

    // return null
  }
}

export default HomePresenter
