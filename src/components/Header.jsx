import React from 'react'
import ShinyText from './ShinyText';
import logo from '../../logo.png';

export default function Header(){
  return (
    <header className="header">
        <div className="brand">
          <img src={logo} alt="BCE GlobalTech" className="brand-logo" />
          <div className="brand-text">
            <div className="brand-title">
              <ShinyText
                text="DataFlow AI"
                speed={3}
                delay={0}
                color="#ffffff"
                shineColor="#82bfff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </div>
          </div>
        </div>
      <div className="header-user">
        <div className="header-avatar">U</div>
        <span>Welcome, Demo User</span>
      </div>
    </header>
  )
}
