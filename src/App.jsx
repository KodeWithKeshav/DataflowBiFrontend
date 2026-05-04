import React, { useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useDispatch } from 'react-redux'
import { fetchTableThunk } from './store/tableThunkCreators'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:40,fontFamily:'monospace',color:'red'}}>
          <h2>React Error:</h2>
          <pre>{this.state.error?.message}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App(){
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTableThunk());
  },[]);
  
  return (
    <ErrorBoundary>
      <div className="app-root">
        <Header />
        <div className="main-area">
          <Sidebar />
          <main className="content-area">
            <Dashboard />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
