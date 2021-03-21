import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Assignments from 'Routes/Assignments/Assignments'
import Grades from 'Routes/Grades/Grades'
import CourseSlides from 'Routes/CourseSlides/CourseSlides'
import Settings from 'Routes/Settings/Settings'
import AssignmentInstruction from './Routes/AssignmentInstruction/AssignmentInstruction'
import Home from './Routes/Home/Home'
import Login from './Routes/Login/Login'
import './App.css'
import './theme.css'

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/assignmentInstruction/:homeworkId?' component={AssignmentInstruction} />
        <Route path='/login' component={Login} />
        <Route path='/grades' component={Grades} />
        <Route path='/courseSlides' component={CourseSlides} />
        <Route path='/settings' component={Settings} />
        <Route path='/assignments' component={Assignments} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
