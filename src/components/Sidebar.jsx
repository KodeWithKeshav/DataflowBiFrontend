import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setActiveTable} from './../store/tableReducer'
import { fetchTableRowsThunk } from '../store/tableThunkCreators';


export default function Sidebar(){
  const [active, setActive] = React.useState()
  
  const tables = useSelector(state=>state.table.tables);
  const activeTable = useSelector(state=>state.table.activeTable);
  const dispatch = useDispatch();

  console.log(activeTable)

  const handleTableSelection = (table)=>{
      dispatch(setActiveTable(table));
      dispatch(fetchTableRowsThunk(table.tableName))
  }

  return (
    <aside className="sidebar">
      <h3>Tables</h3>
      <div className="table-list">
        {tables &&  tables.map(table=> (
          <div key={table.tableName} onClick={()=>handleTableSelection(table)} className={"table-item "+(activeTable && activeTable.tableName === table.tableName? 'active':'')} >
            {table.tableName}
          </div>
        ))}
      </div>
      <div className="footer-note">This demo uses local dummy data only.</div>
    </aside>
  )
}
