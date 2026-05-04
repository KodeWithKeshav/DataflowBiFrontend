import React from 'react'

export default function KPICard({title,value,trend}){
  return (
    <div className="kpi-card">
      <div style={{fontSize:12,fontWeight:600,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>{title}</div>
      <div style={{fontSize:26,fontWeight:800,marginTop:10,color:'var(--text-primary)',letterSpacing:'-0.5px'}}>{value}</div>
      {trend && <div style={{fontSize:12,color:'var(--blue-500)',marginTop:8,fontWeight:600}}>{trend}</div>}
    </div>
  )
}
