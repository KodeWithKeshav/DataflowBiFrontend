import React, { useState } from 'react'
import dummy from '../data/dummy'
// import KPICard from './KPICard'
import ChartCard from './ChartCard'
import { useSelector } from 'react-redux'
import RightSideBar from './RightSideBar'
import { analyseSelection } from '../api/api'
import { createAnalysisRequest } from '../models/AnalysisRequestBody'


export default function Dashboard(){
  const [selectedCols, setSelectedCols] = React.useState([])
  const [chartType, setChartType] = React.useState('bar')
  const [analyzedData, setAnalyzedData] = useState({});

  const activeTable = useSelector(state=>state.table.activeTable)


  const columns = activeTable.columns || [];


  function toggleCol(columnName){
    if(selectedCols.includes(columnName)){
      setSelectedCols(prev=>prev.filter(column=>column !== columnName))
    }else{
      setSelectedCols(prev=>[...prev,columnName])
    }
  }

  async function handleApplySelection(){
    const requestBody = createAnalysisRequest(activeTable,columns,selectedCols)
    console.log("request body: ",requestBody)
    const data = await analyseSelection(requestBody);
    setAnalyzedData(data);
    console.log(data)
  }

  return (
    <section className="dashboard">
      {/* <div className="kpi-row">
        <KPICard title={`Table: ${table}`} value={`${rows.length} rows`} />
        <KPICard title={measure ? `Total ${measure}` : 'Total'} value={measure ? total : '-'} />
        <KPICard title={measure ? `Avg ${measure}` : 'Avg'} value={measure ? avg : '-'} />
      </div> */}

      <div className="charts-row">
        <div>
          <div className="chart-card" style={{marginBottom:12}}>
            <div className="controls">
              <div style={{fontWeight:600}}>Columns:</div>
              <select className="select" value={chartType} onChange={e=>setChartType(e.target.value)}>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
              </select>
              <button onClick={handleApplySelection}>Apply</button>
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {columns && columns.map(column=> (
                <label key={column.columnName} style={{display:'flex',alignItems:'center',gap:6}}>
                  <input type="checkbox" checked={selectedCols.includes(column.columnName)} onChange={()=>toggleCol(column.columnName)} />
                  <span style={{color: selectedCols.includes(column.columnName)?'var(--blue-600)':'inherit'}}>{column.columnName}</span>
                </label>
              ))}
            </div>
          </div>

          {/* <ChartCard title={`${measure||'Measure'} by ${dim||'Dimension'}`} data={chartData} xKey={dim} yKey={measure} type={chartType} /> */}
        </div>

        <RightSideBar suggestedCharts={analyzedData.suggestedChartTypes}  />
      </div>
    </section>
  )
}
