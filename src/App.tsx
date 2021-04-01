import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Assignments from './Routes/Assignments/Assignments'
import AssignmentInstruction from './Routes/AssignmentInstruction/AssignmentInstruction'
import CourseSlides from './Routes/CourseSlides/CourseSlides'
import Grades from './Routes/Grades/Grades'
import Home from './Routes/Home/Home'
import LessonDetails from './Routes/LessonDetails/LessonDetails'
import Login from './Routes/Login/Login'
import Settings from './Routes/Settings/Settings'
import UpdatePassword from 'Routes/Settings/UpdatePassword/UpdatePassword'
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
        <Route path='/settings' exact component={Settings} />
        <Route path='/settings/resetPassword' exact component={UpdatePassword} />
        <Route path='/assignments' component={Assignments} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
