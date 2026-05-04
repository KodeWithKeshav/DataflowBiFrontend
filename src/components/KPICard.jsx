import React from 'react'

export default function KPICard({title,value,trend}){
  return (
    <div className="kpi-card">
      <div style={{fontSize:12,color:'var(--muted)'}}>{title}</div>
      <div style={{fontSize:22,fontWeight:700,marginTop:8}}>{value}</div>
      {trend && <div style={{fontSize:12,color:'green',marginTop:6}}>{trend}</div>}
    </div>
  )
}
