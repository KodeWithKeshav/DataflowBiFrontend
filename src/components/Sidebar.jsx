import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTable } from './../store/tableReducer'
import { fetchTableRowsThunk } from '../store/tableThunkCreators';


export default function Sidebar() {
  const tables = useSelector(state => state.table.tables);
  const activeTable = useSelector(state => state.table.activeTable);
  const dispatch = useDispatch();

  const handleTableSelection = (table) => {
    dispatch(setActiveTable(table));
    dispatch(fetchTableRowsThunk(table.tableName))
  }

  return (
    <aside className="sidebar animate-slide-left">
      <div className="sidebar-header">
        <span className="material-symbols-rounded">database</span>
        <h3>Tables</h3>
      </div>
      <div className="table-list">
        {tables && tables.map((table, idx) => (
          <div
            key={table.tableName}
            onClick={() => handleTableSelection(table)}
            className={`table-item stagger-${idx + 1} animate-fade-in ${activeTable && activeTable.tableName === table.tableName ? 'active' : ''}`}
          >
            <div className="table-icon">
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>table_chart</span>
            </div>
            {table.tableName}
          </div>
        ))}
      </div>
    </aside>
  )
}
