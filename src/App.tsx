import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CourseSlides from './Routes/Course Slides/CourseSlides'
import Home from './Routes/Home/Home'
import Login from './Routes/Login/Login'
import './App.css'
import './theme.css'

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/courslides' component={CourseSlides} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
