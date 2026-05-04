import React from 'react'
import ShinyText from './ShinyText';

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">DF</div>
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
          <div className="brand-subtitle">Self-service analytics (demo)</div>
        </div>
      </div>
      <div className="header-user">
        <div className="header-avatar">U</div>
        <span>Welcome, User</span>
      </div>
    </header>
  )
}
