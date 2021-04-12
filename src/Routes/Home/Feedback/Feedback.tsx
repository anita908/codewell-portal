import React, { Component, ReactElement } from 'react'
import './style.css'

class Feedback extends Component {
  render(): ReactElement {
    return (
      <div id='feedback'>
        <a
          href='https://docs.google.com/forms/d/e/1FAIpQLSeHEHAP7mMU465lxFjE3-UsuQl0f_Ni7tOVuRdqoAKBLJANUA/viewform?usp=sf_link'
          className='feedback-button'
          target='_blank'
          rel='noreferrer'
        >
          Feedback
        </a>
      </div>
    )
  }
}

export default Feedback
