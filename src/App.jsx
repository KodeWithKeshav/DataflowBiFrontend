import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

export default function App(){
  return (
    <div className="app-root">
      <Header />
      <div className="main-area">
        <Sidebar />
        <main className="content-area">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
