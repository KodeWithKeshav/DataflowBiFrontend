import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleActiveChart, setChartData, setActiveCharts } from './../store/chartReducer';
import BorderGlow from './BorderGlow';
import { analyseSelection } from '../api/api';
import { createAnalysisRequest } from '../models/AnalysisRequestBody';

function RightSideBar() {
    const dispatch = useDispatch();

    const selectedTableData = useSelector(state => state.table.activeTableRows);
    const suggestedCharts = useSelector(state => state.chart.suggestedCharts);
    const activeCharts = useSelector(state => state.chart.activeCharts || []);
    const activeTable = useSelector(state => state.table.activeTable);

   
    const [selectedCols, setSelectedCols] = useState([]);

    useEffect(() => {
        setSelectedCols([]);
        dispatch(setChartData({ data: [], suggestedChartTypes: [], metaData: {} }));
        dispatch(setActiveCharts([]));
    }, [activeTable?.tableName, dispatch]);

    if (!selectedTableData || selectedTableData.length === 0) {
        return (
            <BorderGlow className="animate-fade-in" animated={true}>
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <span className="material-symbols-rounded">table_view</span>
                    </div>
                    <div className="empty-state-title">No Table Selected</div>
                    <div className="empty-state-desc">
                        Select a table from the sidebar to preview its data here.
                    </div>
                </div>
            </BorderGlow>
        );
    }

    const columns = Object.keys(selectedTableData[0] || {});
    const tableColumns = activeTable?.columns || [];

    function toggleCol(columnName) {
        if (selectedCols.includes(columnName)) {
            setSelectedCols(prev => prev.filter(col => col !== columnName));
        } else {
            setSelectedCols(prev => [...prev, columnName]);
        }
    }

    async function handleApplySelection() {
        if (!activeTable) return;
        const requestBody = createAnalysisRequest(activeTable, tableColumns, selectedCols);
        const data = await analyseSelection(requestBody);
        dispatch(setChartData({ ...data }));
    }

    return (
        <div className="animate-fade-in">
            <BorderGlow style={{ marginBottom: 16, height: 240 }}>
                <div className="controls">
                    <div className="controls-label">
                        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                            view_column
                        </span>
                        Columns
                    </div>
                    <button
                        className="btn-primary"
                        onClick={handleApplySelection}
                        style={{ marginLeft: 'auto' }}
                    >
                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                            play_arrow
                        </span>
                        Apply
                    </button>
                </div>

                <div className="column-chips">
                    {Array.isArray(tableColumns) && tableColumns.map(column => (
                        <label
                            key={column.columnName}
                            className={`column-chip ${selectedCols.includes(column.columnName) ? 'active' : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedCols.includes(column.columnName)}
                                onChange={() => toggleCol(column.columnName)}
                            />
                            <span className="chip-dot"></span>
                            <span>{column.columnName}</span>
                        </label>
                    ))}
                </div>
            </BorderGlow>

            <BorderGlow style={{ marginBottom: 16, height: 380 }}>
                <div className="chart-card-header">
                    <div className="chart-card-title">
                        <span
                            className="material-symbols-rounded"
                            style={{ fontSize: 18, marginRight: 6, color: 'var(--blue-500)' }}
                        >
                            preview
                        </span>
                        Preview Data
                    </div>
                    <span className="section-badge">{selectedTableData.length} rows</span>
                </div>

                <div className="data-table-wrap">
                    <table className="data-table">
                        <thead>
                            <tr>
                                {columns.map(col => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTableData.map((row, idx) => (
                                <tr key={idx}>
                                    {columns.map(col => (
                                        <td key={col}>
                                            {row[col] === null ? '—' : String(row[col])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </BorderGlow>

            {/* Chart Suggestions */}
            <BorderGlow style={{ height: 220 }}>
                <div className="chart-card-header">
                    <div className="chart-card-title">
                        <span
                            className="material-symbols-rounded"
                            style={{ fontSize: 18, marginRight: 6, color: 'var(--blue-500)' }}
                        >
                            auto_awesome
                        </span>
                        Chart Suggestions
                    </div>
                </div>

                <div className="suggestion-pills">
                    {suggestedCharts && suggestedCharts.length > 0 ? (
                        suggestedCharts.map(chart => (
                            <button
                                key={chart.chartType}
                                onClick={() => dispatch(toggleActiveChart(chart.chartType))}
                                className={`suggestion-pill ${activeCharts.includes(chart.chartType) ? 'active' : ''}`}
                            >
                                <span className="material-symbols-rounded">insights</span>
                                {chart.chartType}
                            </button>
                        ))
                    ) : (
                        <div className="suggestion-empty">
                            <span className="material-symbols-rounded">magic_button</span>
                            Select columns and click Apply to generate AI chart suggestions.
                        </div>
                    )}
                </div>
            </BorderGlow>
        </div>
    );
}

export default RightSideBar;