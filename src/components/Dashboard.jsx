import React from 'react'
import dummy from '../data/dummy'
// import KPICard from './KPICard'
import { useSelector } from 'react-redux'
import RightSideBar from './RightSideBar'
import AnalysisChartRenderer from './AnalysisChartRender'
import BorderGlow from './BorderGlow'


export default function Dashboard(){
  const activeTable = useSelector(state=>state.table.activeTable)

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
          <AnalysisChartRenderer />
          {/* <ChartCard title={`${measure||'Measure'} by ${dim||'Dimension'}`} data={chartData} xKey={dim} yKey={measure} type={chartType} /> */}
        </div>

        <RightSideBar  />
      </div>
    </section>
  )
}
