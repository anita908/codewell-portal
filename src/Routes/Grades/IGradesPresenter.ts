import IChapterGradesModel from 'Routes/Grades/Interfaces/IChapterGradesModel'

interface IGradesPresenter {
  getSessionGradesModel(): Promise<IChapterGradesModel[]>
  getOverallGrade(): Promise<number>
}

export default IGradesPresenter
