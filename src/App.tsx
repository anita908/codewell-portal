import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Assignments from './Routes/Assignments/Assignments'
import AssignmentInstruction from './Routes/AssignmentInstruction/AssignmentInstruction'
import CheckToken from './Routes/ForgotPassword/CheckToken'
import CourseSlides from './Routes/CourseSlides/CourseSlides'
import ForgotPassword from './Routes/ForgotPassword/ForgotPassword'
import Grades from './Routes/Grades/Grades'
import LessonDetails from './Routes/LessonDetails/LessonDetails'
import Login from './Routes/Login/Login'
import Home from './Routes/Home/Home'
import Settings from './Routes/Settings/Settings'
import './App.css'
import './theme.css'

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/assignmentInstruction/:homeworkId?' component={AssignmentInstruction} />
        <Route path='/lessonDetails/:lessonId?' component={LessonDetails} />
        <Route path='/login' component={Login} />
        <Route path='/grades' component={Grades} />
        <Route path='/courseSlides' component={CourseSlides} />
        <Route path='/settings' component={Settings} />
        <Route path='/assignments' component={Assignments} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route path='/resetPassword' component={CheckToken} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
