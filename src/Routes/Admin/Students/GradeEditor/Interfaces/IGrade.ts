interface IGrade {
  id: number
  homeworkId: number
  homeworkName: string
  submissionUrl: string
  score: number | null
  feedback: string
  dueDate: string | null
  submitted: string
}

export default IGrade
