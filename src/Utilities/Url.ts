const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

export const login = `${baseUrl}/api/v1/auth/login`
export const logout = `${baseUrl}/api/v1/auth/logout`
export const updatePassword = `${baseUrl}/api/v1/auth/updateCredentials`

export const homeData = `${baseUrl}/api/v1/learning/progress`

export const homeworkVideo = `${baseUrl}/api/v1/homework/videos?homeworkId=`
export const homeworkVideoByCourseId = `${baseUrl}/api/v1/homework/videos/course?courseId=`
export const uploadAssignmentUrl = `${baseUrl}/api/v1/homework/upload/url`
export const uploadAssignmentFile = `${baseUrl}/api/v1/homework/upload/file`

export const resetPassword = `${baseUrl}/api/v1/auth/updateCredentials`
export const sendEmail = `${baseUrl}/api/v1/auth/reset/sendEmail/`

export const createUser = `${baseUrl}/api/v1/user/create`
export const updateUser = `${baseUrl}/api/v1/user/update`
export const userData = `${baseUrl}/api/v1/user`

export const allStudents = `${baseUrl}/api/v1/admin/users`
export const bulkUpdateStudentGrades = `${baseUrl}/api/v1/admin/grades/update/bulk`
export const enrollment = `${baseUrl}/api/v1/admin/enrollment`
export const getStudentGrades = `${baseUrl}/api/v1/admin/grades`
export const taughtSessions = `${baseUrl}/api/v1/admin/sessions/teaching`
export const updateEnrollment = `${baseUrl}/api/v1/admin/enrollment/update`
