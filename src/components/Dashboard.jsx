import React, { useState } from 'react'
import dummy from '../data/dummy'
// import KPICard from './KPICard'
import ChartCard from './ChartCard'
import { useSelector } from 'react-redux'
import RightSideBar from './RightSideBar'
import { analyseSelection } from '../api/api'
import BorderGlow from './BorderGlow'



export default function Dashboard(){
  const [selectedCols, setSelectedCols] = React.useState([])
  const [analyzedData, setAnalyzedData] = useState({});

  const activeTable = useSelector(state=>state.table.activeTable)

  const columns = (activeTable && activeTable.columns) || [];
  const numericCols =  columns.filter(column=> column.logicalType === 'NUMBER');
  const categoricalCols = columns.filter(column=> column.logicalType === 'STRING');



  function toggleCol(columnName){
    if(selectedCols.includes(columnName)){
      setSelectedCols(prev=>prev.filter(col=>col !== columnName))
    }else{
      setSelectedCols(prev=>[...prev,columnName])
    }
  }

  async function handleApplySelection(){
    if (!numericCols.length) return;
    const analysisBody = {
      tableName: activeTable.tableName,
      dimensions: categoricalCols.map(column=>column.columnName),
      measureColumn: numericCols[0].columnName,
      aggregationType: 'COUNT'
    }

    const data = await analyseSelection(analysisBody);
    if (data) {
      setAnalyzedData(data);
      console.log(data)
    }
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
      {/* <div className="kpi-row">
        <KPICard title={`Table: ${table}`} value={`${rows.length} rows`} />
        <KPICard title={measure ? `Total ${measure}` : 'Total'} value={measure ? total : '-'} />
        <KPICard title={measure ? `Avg ${measure}` : 'Avg'} value={measure ? avg : '-'} />
      </div> */}

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

          {/* <ChartCard title={`${measure||'Measure'} by ${dim||'Dimension'}`} data={chartData} xKey={dim} yKey={measure} type={chartType} /> */}
        </div>

        <RightSideBar suggestedCharts={analyzedData.suggestedChartTypes}  />
      </div>
    </section>
  )
}
