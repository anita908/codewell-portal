class GradeHelper {
  public static determineGradeCategory(grade: number | null): string {
    if (!grade) {
      return ''
    }
    let gradeLevel = ''
    if (grade < 65) {
      gradeLevel = 'F'
    } else if (grade < 70) {
      gradeLevel = 'D'
    } else if (grade < 73) {
      gradeLevel = 'C-'
    } else if (grade < 77) {
      gradeLevel = 'C'
    } else if (grade < 80) {
      gradeLevel = 'C+'
    } else if (grade < 83) {
      gradeLevel = 'B-'
    } else if (grade < 87) {
      gradeLevel = 'B'
    } else if (grade < 90) {
      gradeLevel = 'B+'
    } else if (grade < 93) {
      gradeLevel = 'A-'
    } else if (grade < 97) {
      gradeLevel = 'A'
    } else if (grade <= 100) {
      gradeLevel = 'A+'
    }
    return gradeLevel
  }
}

export default GradeHelper
