import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

function RightSideBar({suggestedCharts}) {
    const selectedTableData = useSelector(state => state.table.activeTableRows);

    

    // 1. Check if data exists and is not empty
    if (!selectedTableData || selectedTableData.length === 0) {
        return (
            <div className="chart-card animate-fade-in">
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-rounded">table_view</span>
                    </div>
                    <div className="empty-state-title">No Table Selected</div>
                    <div className="empty-state-desc">Select a table from the sidebar to preview its data here.</div>
                </div>
            </div>
        );
    }

    // 2. Extract column names from the first object keys
    const columns = Object.keys(selectedTableData[0]);

    return (
        <div className="animate-fade-in">
            <div className="chart-card" style={{ marginBottom: 16, height: 380, display: 'flex', flexDirection: 'column' }}>
                <div className="chart-card-header">
                    <div className="chart-card-title">
                        <span className="material-symbols-rounded" style={{fontSize:18, verticalAlign:'middle', marginRight:6, color:'var(--blue-500)'}}>preview</span>
                        Preview Data
                    </div>
                    <span className="section-badge">{selectedTableData.length} rows</span>
                </div>
                <div className="data-table-wrap" style={{ flex: 1, height: 'auto', maxHeight: 'none' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                {columns.map(c => (
                                    <th key={c}>
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTableData.map((row, idx) => (
                                <tr key={idx}>
                                    {columns.map(colName => (
                                        <td key={colName}>
                                            {row[colName] === null ? '—' : String(row[colName])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="chart-card" style={{ height: 220, display: 'flex', flexDirection: 'column' }}>
                <div className="chart-card-header">
                    <div className="chart-card-title">
                        <span className="material-symbols-rounded" style={{fontSize:18, verticalAlign:'middle', marginRight:6, color:'var(--blue-500)'}}>auto_awesome</span>
                        Chart Suggestions
                    </div>
                </div>
                <div className="suggestion-pills" style={{ flex: 1, overflowY: 'auto' }}>
                    {suggestedCharts && suggestedCharts.length > 0 ? (
                        suggestedCharts.map(chart=> (
                            <button key={chart} className="suggestion-pill">
                                <span className="material-symbols-rounded">insights</span>
                                {chart}
                            </button>
                        ))
                    ) : (
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginTop: 24, padding: '0 16px' }}>
                            <span className="material-symbols-rounded" style={{ fontSize: 24, display: 'block', marginBottom: 8, opacity: 0.5 }}>magic_button</span>
                            Select columns and click Apply to generate AI chart suggestions.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RightSideBar;
