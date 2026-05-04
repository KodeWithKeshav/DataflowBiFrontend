import React, { useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useDispatch } from 'react-redux'
import { fetchTableThunk } from './store/tableThunkCreators'

export default function App(){
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTableThunk());
  },[]);
  
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
