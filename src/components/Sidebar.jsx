import React from 'react'
import dummy from '../data/dummy'

export default function Sidebar(){
  const [tables, setTables] = React.useState(Object.keys(dummy))
  const [active, setActive] = React.useState(tables[0])

  React.useEffect(()=>{
    // broadcast selected table via custom event for simplicity
    window.dispatchEvent(new CustomEvent('df.table.select',{detail:active}))
  },[active])

  return (
    <aside className="sidebar">
      <h3>Tables</h3>
      <div className="table-list">
        {tables.map(t=> (
          <div key={t} className={"table-item "+(t===active? 'active':'')} onClick={()=>setActive(t)}>
            {t}
          </div>
        ))}
      </div>
      <div className="footer-note">This demo uses local dummy data only.</div>
    </aside>
  )
}
