import React from 'react'

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">DF</div>
        <div className="brand-text">
          <div className="brand-title">DataFlow AI</div>
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
