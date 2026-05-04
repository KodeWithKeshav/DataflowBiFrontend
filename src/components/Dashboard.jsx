import React from 'react'
import dummy from '../data/dummy'
import KPICard from './KPICard'
import ChartCard from './ChartCard'

function getColumnsForTable(table){
  const rows = dummy[table] || []
  if(!rows.length) return []
  return Object.keys(rows[0])
}

function aggregateBy(rows, dim, measure){
  const map = new Map()
  rows.forEach(r=>{
    const k = r[dim]
    const val = Number(r[measure]) || 0
    map.set(k, (map.get(k)||0) + val)
  })
  return Array.from(map.entries()).map(([k,v])=>({[dim]:k, [measure]:v}))
}

export default function Dashboard(){
  const [table, setTable] = React.useState(Object.keys(dummy)[0])
  const [cols, setCols] = React.useState(getColumnsForTable(table))
  const [selectedCols, setSelectedCols] = React.useState([])
  const [chartType, setChartType] = React.useState('bar')

  React.useEffect(()=>{
    function onSelect(e){ setTable(e.detail) }
    window.addEventListener('df.table.select', onSelect)
    return ()=> window.removeEventListener('df.table.select', onSelect)
  },[])

  React.useEffect(()=>{
    setCols(getColumnsForTable(table))
    setSelectedCols([])
  },[table])

  const rows = dummy[table] || []

  const numericCols = cols.filter(c=> rows.some(r=> typeof r[c] === 'number'))
  const categoricalCols = cols.filter(c=> rows.some(r=> typeof r[c] === 'string'))

  const measure = selectedCols.find(c=> numericCols.includes(c)) || numericCols[0]
  const dim = selectedCols.find(c=> categoricalCols.includes(c)) || categoricalCols[0]

  const chartData = (measure && dim) ? aggregateBy(rows, dim, measure) : []

  const total = rows.reduce((s,r)=> s + (Number(r[measure])||0),0)
  const avg = rows.length ? Math.round(total/rows.length) : 0

  function toggleCol(col){
    setSelectedCols(prev => prev.includes(col) ? prev.filter(x=>x!==col) : [...prev,col])
  }

  return (
    <section className="dashboard">
      <div className="kpi-row">
        <KPICard title={`Table: ${table}`} value={`${rows.length} rows`} />
        <KPICard title={measure ? `Total ${measure}` : 'Total'} value={measure ? total : '-'} />
        <KPICard title={measure ? `Avg ${measure}` : 'Avg'} value={measure ? avg : '-'} />
      </div>

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
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {cols.map(c=> (
                <label key={c} style={{display:'flex',alignItems:'center',gap:6}}>
                  <input type="checkbox" checked={selectedCols.includes(c)} onChange={()=>toggleCol(c)} />
                  <span style={{color: selectedCols.includes(c)?'var(--blue-600)':'inherit'}}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <ChartCard title={`${measure||'Measure'} by ${dim||'Dimension'}`} data={chartData} xKey={dim} yKey={measure} type={chartType} />
        </div>

        <div>
          <div className="chart-card" style={{marginBottom:16}}>
            <div style={{fontWeight:700,marginBottom:8}}>Preview Data</div>
            <div style={{maxHeight:280,overflow:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead style={{position:'sticky',top:0,background:'white'}}>
                  <tr>
                    {cols.map(c=> <th key={c} style={{textAlign:'left',padding:6,fontSize:12,color:'var(--muted)'}}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r,idx)=> (
                    <tr key={idx} style={{borderTop:'1px solid #f1f6ff'}}>
                      {cols.map(c=> <td key={c} style={{padding:6,fontSize:13}}>{String(r[c])}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-card">
            <div style={{fontWeight:700,marginBottom:8}}>Chart Suggestions</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <button className="select" onClick={()=>setChartType('bar')}>Bar Chart</button>
              <button className="select" onClick={()=>setChartType('line')}>Line Chart</button>
              <button className="select" onClick={()=>setChartType('pie')}>Pie Chart</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
