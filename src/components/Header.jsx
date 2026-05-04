import React from 'react'

export default function Header(){
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">DF</div>
        <div>
          <div style={{fontSize:16}}>DataFlow AI</div>
          <div style={{fontSize:12,opacity:0.9}}>Self-service analytics (demo)</div>
        </div>
      </div>
      <div style={{fontSize:14,opacity:0.95}}>Welcome, Demo User</div>
    </header>
  )
}
