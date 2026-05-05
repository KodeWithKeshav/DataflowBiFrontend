import React, { useState } from 'react'
import dummy from '../data/dummy'
// import KPICard from './KPICard'
import { useDispatch, useSelector } from 'react-redux'
import RightSideBar from './RightSideBar'
import { analyseSelection } from '../api/api'
import { createAnalysisRequest } from '../models/AnalysisRequestBody'
import AnalysisChartRenderer from './AnalysisChartRender'
import { setChartData, setActiveCharts } from '../store/chartReducer'
import BorderGlow from './BorderGlow'


export default function Dashboard(){
  const [selectedCols, setSelectedCols] = React.useState([])
  const dispatch = useDispatch();

  const activeTable = useSelector(state=>state.table.activeTable)

  const columns = (activeTable && activeTable.columns) || [];

  React.useEffect(() => {
    // clear selected columns and chart data when switching tables
    setSelectedCols([]);
    dispatch(setChartData({ data: [], suggestedChartTypes: [], metaData: {} }));
    dispatch(setActiveCharts([]));
  }, [activeTable && activeTable.tableName]);


  function toggleCol(columnName){
    if(selectedCols.includes(columnName)){
      setSelectedCols(prev=>prev.filter(column=>column !== columnName))
    }else{
      setSelectedCols(prev=>[...prev,columnName])
    }
  }

  async function handleApplySelection(){
    const requestBody = createAnalysisRequest(activeTable,columns,selectedCols)
    const data = await analyseSelection(requestBody);
    dispatch(setChartData({...data}))
  }

  // Show welcome state when no table is selected
  if (!activeTable || !activeTable.tableName) {
    return (
      <section className="dashboard animate-fade-in">
        <div style={{gridColumn:'1/13'}}>
          <BorderGlow animated={true}>
            <div className="empty-state" style={{minHeight:320}}>
              <div className="empty-state-icon">
                <span className="material-symbols-rounded">analytics</span>
              </div>
              <div className="empty-state-title">Welcome to DataFlow AI</div>
              <div className="empty-state-desc" style={{maxWidth:300}}>Select a table from the sidebar to start exploring your data with intelligent analytics.</div>
            </div>
          </BorderGlow>
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard animate-fade-in">
      <div className="charts-row">
        <div>
          <BorderGlow style={{marginBottom:16, height: 240}}>
            <div className="controls">
              <div className="controls-label">
                <span className="material-symbols-rounded" style={{fontSize:18}}>view_column</span>
                Columns
              </div>
              
              <button className="btn-primary" onClick={handleApplySelection} style={{ marginLeft: 'auto' }}>
                <span className="material-symbols-rounded" style={{fontSize:16}}>play_arrow</span>
                Apply
              </button>
            </div>
            <div className="column-chips" style={{ flex: 1, height: 'auto', maxHeight: 'none' }}>
              {columns && columns.map(column=> (
                <label 
                  key={column.columnName} 
                  className={`column-chip ${selectedCols.includes(column.columnName) ? 'active' : ''}`}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedCols.includes(column.columnName)} 
                    onChange={()=>toggleCol(column.columnName)} 
                  />
                  <span className="chip-dot"></span>
                  <span>{column.columnName}</span>
                </label>
              ))}
            </div>
          </BorderGlow>

          <AnalysisChartRenderer />
          {/* <ChartCard title={`${measure||'Measure'} by ${dim||'Dimension'}`} data={chartData} xKey={dim} yKey={measure} type={chartType} /> */}
        </div>

        <RightSideBar  />
      </div>
    </section>
  )
}
