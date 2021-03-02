import React from 'react'
import loginIllustration from '../../images/login.svg'
import './style.css'

function Login() {
  return (
    <div id='login'>
      <div className='login-illustration'>
        <div className='login-image'>
          <h1>Codewell Learning</h1>
          <h2>Student Portal</h2>
          <img alt='login' className='login' src={loginIllustration} />
        </div>
      </div>
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
