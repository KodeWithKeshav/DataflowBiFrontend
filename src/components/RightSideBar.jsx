import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setChartData,setActiveChart} from './../store/chartReducer'

function RightSideBar() {
    const dispatch = useDispatch();

    const selectedTableData = useSelector(state => state.table.activeTableRows);
    const suggestedCharts = useSelector(state => state.chart.suggestedChartTypes);

    // 1. Check if data exists and is not empty
    if (!selectedTableData || selectedTableData.length === 0) {
        return <div style={{ padding: 20, textAlign: 'center' }}>Select a table to preview data</div>;
    }

    // 2. Extract column names from the first object keys
    const columns = Object.keys(selectedTableData[0]);

    return (
        <div>
            <div className="chart-card" style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Preview Data</div>
                <div style={{ maxHeight: 280, overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                            <tr>
                                {columns.map(c => (
                                    <th key={c} style={{ textAlign: 'left', padding: 6, fontSize: 12, color: 'var(--muted)', textTransform: 'capitalize' }}>
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTableData.map((row, idx) => (
                                <tr key={idx} style={{ borderTop: '1px solid #f1f6ff' }}>
                                    {columns.map(colName => (
                                        <td key={colName} style={{ padding: 6, fontSize: 13 }}>
                                            {row[colName] === null ? '-' : String(row[colName])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="chart-card">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Chart Suggestions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {suggestedCharts && suggestedCharts.map(chart=> <button key={chart} onClick={()=>dispatch(setActiveChart(chart))} className="select">{chart}</button>)}
                </div>
            </div>
        </div>
    );
}

export default RightSideBar;
