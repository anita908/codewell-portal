import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
        <Route path='/login' component={Login} />
        <Route path='/assignmentInstruction' component={AssignmentInstruction} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
