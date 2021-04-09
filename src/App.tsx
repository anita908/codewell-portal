import React, { ReactElement } from 'react'
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import AdminHome from './Routes/Admin/Home/Home'
import Assignments from './Routes/Assignments/Assignments'
import AssignmentInstruction from './Routes/AssignmentInstruction/AssignmentInstruction'
import Cookies from 'Utilities/Cookies'
import CourseSlides from './Routes/CourseSlides/CourseSlides'
import ForgotPassword from './Routes/ForgotPassword/ForgotPassword'
import Grades from './Routes/Grades/Grades'
import Home from './Routes/Home/Home'
import JwtValidator from 'Utilities/JwtValidator'
import LessonDetails from './Routes/LessonDetails/LessonDetails'
import Login from './Routes/Login/Login'
import ResetPassword from 'Routes/ForgotPassword/ResetPassword/ResetPassword'
import Settings from './Routes/Settings/Settings'
import UpdatePassword from 'Routes/Settings/UpdatePassword/UpdatePassword'
import './App.css'
import './theme.css'

function App(): ReactElement {
  const StudentAuthProtectedRoute = (routeProps: RouteProps) => {
    if (Cookies.get('auth') && JwtValidator.validate(Cookies.get('auth'))) {
      return <Route {...routeProps} />
    } else {
      localStorage.clear()
      Cookies.remove('auth')
      return <Redirect to='/login' />
    }
  }

  const AdminAuthProtectedRoute = (routeProps: RouteProps) => {
    if (Cookies.get('adminAuth') && JwtValidator.validate(Cookies.get('adminAuth'))) {
      return <Route {...routeProps} />
    } else {
      localStorage.clear()
      Cookies.remove('adminAuth')
      return <Redirect to='/login' />
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <StudentAuthProtectedRoute exact path='/' component={Home} />
        <AdminAuthProtectedRoute exact path='/admin' component={AdminHome} />
        <StudentAuthProtectedRoute
          path='/assignmentInstruction/:homeworkId?'
          component={AssignmentInstruction}
        />
        <StudentAuthProtectedRoute path='/lessonDetails/:lessonId?' component={LessonDetails} />
        <Route path='/login' component={Login} />
        <StudentAuthProtectedRoute path='/grades' component={Grades} />
        <StudentAuthProtectedRoute path='/courseSlides' component={CourseSlides} />
        <StudentAuthProtectedRoute path='/settings' exact component={Settings} />
        <StudentAuthProtectedRoute
          exact
          path='/settings/resetPassword'
          component={UpdatePassword}
        />
        <StudentAuthProtectedRoute path='/assignments' component={Assignments} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route path='/resetPassword' component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
