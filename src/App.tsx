import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Routes/Home/Home'
import Login from './Routes/Login/Login'
import './App.css'

function App(): ReactElement {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/login' component={Login} />
    </Switch>
  )
}

export default App
