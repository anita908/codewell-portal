import React from 'react'
import './style.css'

function Login() {
  return (
    <div id='login'>
      <div className='login-illustration' />
      <div className='login-input'>
        <div className='login-inputGroup'>
          <div className='login-email'>
            <label htmlFor='email'>Email: </label>
            <input type='email' id='email' name='email' />
          </div>
          <div className='login-password'>
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' name='password' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
