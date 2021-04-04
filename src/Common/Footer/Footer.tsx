import React, { Component, ReactElement } from 'react'
import './style.css'

class Footer extends Component {
  render(): ReactElement {
    return (
      <footer>
        <p className='footer-copyRight'>
          Copyright © {new Date().getFullYear()} CodeWell All rights reserved.
        </p>
        <a
          href='https://www.facebook.com/CodeWell-Learning-100702755288198'
          target='_blank'
          rel='noreferrer'
        >
          {/* @ts-ignore */}
          <ion-icon name='logo-facebook'></ion-icon>
        </a>
      </footer>
    )
  }
}

export default Footer
