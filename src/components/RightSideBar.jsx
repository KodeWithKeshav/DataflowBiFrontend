import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleActiveChart, setChartData, setActiveCharts } from './../store/chartReducer';
import { setKpiLoading, setKpis, setKpiError, clearKpis } from './../store/kpiReducer';
import BorderGlow from './BorderGlow';
import { analyseSelection, fetchKpis } from '../api/api';
import { createAnalysisRequest } from '../models/AnalysisRequestBody';

const AGGREGATION_TYPES = ["SUM", "AVG", "COUNT", "MIN", "MAX","NONE"];

const FILTER_OPERATORS = [
    { value: "EQUALS",       label: "Equals" },
    { value: "NOT_EQUALS",   label: "Not Equals" },
    { value: "GREATER_THAN", label: "Greater Than" },
    { value: "LESS_THAN",    label: "Less Than" },
    { value: "BETWEEN",      label: "Between" },
    { value: "CONTAINS",     label: "Contains" },
];

function createEmptyFilter() {
    return { columnName: "", operator: "EQUALS", values: [""] };
}

function RightSideBar() {
    const dispatch = useDispatch();

    const selectedTableData = useSelector(state => state.table.activeTableRows);
    const suggestedCharts = useSelector(state => state.chart.suggestedCharts);
    const activeCharts = useSelector(state => state.chart.activeCharts || []);
    const activeTable = useSelector(state => state.table.activeTable);

    const [selectedCols, setSelectedCols] = useState([]);
    const [aggregationType, setAggregationType] = useState("SUM");
    const [filters, setFilters] = useState([]);
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    useEffect(() => {
        // clear selected columns, chart data, and KPIs when switching tables
        setSelectedCols([]);
        setAggregationType("SUM");
        setFilters([]);
        setFiltersExpanded(false);
        dispatch(setChartData({ data: [], suggestedChartTypes: [], metaData: {} }));
        dispatch(setActiveCharts([]));
        dispatch(clearKpis());
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

    // ── Filter helpers ──────────────────────────────────
    function addFilter() {
        setFilters(prev => [...prev, createEmptyFilter()]);
        setFiltersExpanded(true);
    }

    function removeFilter(index) {
        setFilters(prev => prev.filter((_, i) => i !== index));
    }

    function updateFilter(index, field, value) {
        setFilters(prev => {
            const updated = [...prev];
            const filter = { ...updated[index] };

            if (field === "operator") {
                filter.operator = value;
                filter.values = value === "BETWEEN" ? ["", ""] : [""];
            } else if (field === "columnName") {
                filter.columnName = value;
            } else if (field === "value0") {
                const vals = [...filter.values];
                vals[0] = value;
                filter.values = vals;
            } else if (field === "value1") {
                const vals = [...filter.values];
                vals[1] = value;
                filter.values = vals;
            }

            updated[index] = filter;
            return updated;
        });
    }

    // Build valid filters for the request (skip incomplete ones)
    function getValidFilters() {
        return filters
            .filter(f => f.columnName && f.operator && f.values[0] !== "")
            .map(f => ({
                columnName: f.columnName,
                operator: f.operator,
                values: f.operator === "BETWEEN"
                    ? [f.values[0], f.values[1]]
                    : [f.values[0]],
            }));
    }

    async function handleApplySelection() {
        if (!activeTable) return;

        const validFilters = getValidFilters();

        // Fetch chart analysis
        const requestBody = createAnalysisRequest(
            activeTable, tableColumns, selectedCols, aggregationType, validFilters
        );
        const chartPromise = analyseSelection(requestBody);
        // Await chart data
        const data = await chartPromise;
        dispatch(setChartData({ ...data }));
        // Clear any previously selected/active charts so user must pick from new suggestions
        dispatch(setActiveCharts([]));
        
    }

    async function handleGenerateKpis() {
        if (!activeTable) return;

        if (!selectedCols || selectedCols.length === 0) {
            dispatch(setKpiError('No columns selected for KPI generation'));
            return;
        }

        dispatch(setKpiLoading());
        try {
            const res = await fetchKpis(activeTable.tableName, selectedCols);
            dispatch(setKpis(res.kpis || []));
        } catch (err) {
            dispatch(setKpiError(err?.message || 'Failed to fetch KPIs'));
        }
    }

    const activeFilterCount = getValidFilters().length;

    return (
        <div className="animate-fade-in">
            {/* Column selector + Aggregation */}
            <BorderGlow style={{ marginBottom: 16 }}>
                <div className="controls">
                    <div className="controls-label">
                        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                            view_column
                        </span>
                        Columns
                    </div>

                    {/* Aggregation type dropdown */}
                    <div className="agg-select-wrap">
                        <span className="material-symbols-rounded" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                            functions
                        </span>
                        <select
                            className="agg-select"
                            value={aggregationType}
                            onChange={e => setAggregationType(e.target.value)}
                        >
                            {AGGREGATION_TYPES.map(agg => (
                                <option key={agg} value={agg}>{agg}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <button
                            className="btn-secondary"
                            onClick={handleGenerateKpis}
                            disabled={selectedCols.length === 0}
                            title={selectedCols.length === 0 ? 'Select columns to enable' : 'Generate KPIs for selected columns'}
                        >
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                                analytics
                            </span>
                            Generate KPI
                        </button>

                        <button
                            className="btn-primary"
                            onClick={handleApplySelection}
                        >
                            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                                play_arrow
                            </span>
                            Apply
                        </button>
                    </div>
                </div>

                <div className="column-chips" style={{ height: 100 }}>
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

            {/* Filters */}
            <BorderGlow style={{ marginBottom: 16 }}>
                <div className="filter-header">
                    <button
                        className="filter-toggle"
                        onClick={() => setFiltersExpanded(prev => !prev)}
                    >
                        <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--blue-500)' }}>
                            filter_alt
                        </span>
                        <span className="filter-toggle-label">Filters</span>
                        {activeFilterCount > 0 && (
                            <span className="filter-count-badge">{activeFilterCount}</span>
                        )}
                        <span
                            className="material-symbols-rounded filter-chevron"
                            style={{ transform: filtersExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
                        >
                            expand_more
                        </span>
                    </button>

                    <button className="btn-filter-add" onClick={addFilter}>
                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>add</span>
                        Add
                    </button>
                </div>

                {filtersExpanded && (
                    <div className="filter-list">
                        {filters.length === 0 ? (
                            <div className="filter-empty">
                                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>info</span>
                                No filters applied. Click "Add" to create one.
                            </div>
                        ) : (
                            filters.map((filter, idx) => (
                                <div className="filter-row" key={idx}>
                                    {/* Column */}
                                    <select
                                        className="filter-select"
                                        value={filter.columnName}
                                        onChange={e => updateFilter(idx, "columnName", e.target.value)}
                                    >
                                        <option value="">Column…</option>
                                        {tableColumns.map(col => (
                                            <option key={col.columnName} value={col.columnName}>
                                                {col.columnName}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Operator */}
                                    <select
                                        className="filter-select"
                                        value={filter.operator}
                                        onChange={e => updateFilter(idx, "operator", e.target.value)}
                                    >
                                        {FILTER_OPERATORS.map(op => (
                                            <option key={op.value} value={op.value}>
                                                {op.label}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Value(s) */}
                                    <div className="filter-values">
                                        <input
                                            className="filter-input"
                                            type="text"
                                            placeholder={filter.operator === "BETWEEN" ? "Min" : "Value"}
                                            value={filter.values[0]}
                                            onChange={e => updateFilter(idx, "value0", e.target.value)}
                                        />
                                        {filter.operator === "BETWEEN" && (
                                            <>
                                                <span className="filter-between-sep">–</span>
                                                <input
                                                    className="filter-input"
                                                    type="text"
                                                    placeholder="Max"
                                                    value={filter.values[1] || ""}
                                                    onChange={e => updateFilter(idx, "value1", e.target.value)}
                                                />
                                            </>
                                        )}
                                    </div>

                                    {/* Remove */}
                                    <button
                                        className="filter-remove"
                                        onClick={() => removeFilter(idx)}
                                        title="Remove filter"
                                    >
                                        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>close</span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </BorderGlow>

            {/* Data Preview */}
            <BorderGlow style={{ marginBottom: 16, height: 340 }}>
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