interface IGrade {
  id: number
  homeworkId: number
  homeworkName: string
  score: number | null
  dueDate: string | null
  submitted: string
}

export default IGrade
