import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setChartData, setActiveChart } from './../store/chartReducer'
import BorderGlow from './BorderGlow';

function RightSideBar() {
    const dispatch = useDispatch();

    const selectedTableData = useSelector(state => state.table.activeTableRows);
    const suggestedCharts = useSelector(state => state.chart.suggestedChartTypes);

    // 1. Check if data exists and is not empty
    if (!selectedTableData || selectedTableData.length === 0) {
        return (
            <BorderGlow className="animate-fade-in" animated={true}>
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-rounded">table_view</span>
                    </div>
                    <div className="empty-state-title">No Table Selected</div>
                    <div className="empty-state-desc">Select a table from the sidebar to preview its data here.</div>
                </div>
            </BorderGlow>
        );
    }

    // 2. Extract column names from the first object keys
    const columns = Object.keys(selectedTableData[0]);

    return (
        <div className="animate-fade-in">
            <BorderGlow style={{ marginBottom: 16, height: 380 }}>
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
            </BorderGlow>

            <BorderGlow style={{ height: 220 }}>
                <div className="chart-card-header">
                    <div className="chart-card-title">
                        <span className="material-symbols-rounded" style={{fontSize:18, verticalAlign:'middle', marginRight:6, color:'var(--blue-500)'}}>auto_awesome</span>
                        Chart Suggestions
                    </div>
                </div>
                <div className="suggestion-pills" style={{ flex: 1, overflowY: 'auto' }}>
                    {suggestedCharts && suggestedCharts.length > 0 ? (
                        suggestedCharts.map(chart=> (
                            <button key={chart} onClick={()=>dispatch(setActiveChart(chart))} className="suggestion-pill">
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
            </BorderGlow>
        </div>
    );
}

export default RightSideBar;
