import React from 'react';
import { useDispatch } from 'react-redux';
import { removeKpi } from '../store/kpiReducer';

// Map KPI function names to Material Symbols icons and colors
const KPI_META = {
  SUM:            { icon: 'functions',       color: '#1473e6', bg: 'rgba(20,115,230,0.10)' },
  AVG:            { icon: 'avg_pace',        color: '#6f42c1', bg: 'rgba(111,66,193,0.10)' },
  MIN:            { icon: 'arrow_downward',  color: '#0ea5e9', bg: 'rgba(14,165,233,0.10)' },
  MAX:            { icon: 'arrow_upward',    color: '#f97316', bg: 'rgba(249,115,22,0.10)' },
  COUNT:          { icon: 'tag',             color: '#10b981', bg: 'rgba(16,185,129,0.10)' },
  COUNT_DISTINCT: { icon: 'fingerprint',     color: '#8b5cf6', bg: 'rgba(139,92,246,0.10)' },
  MOST_FREQUENT:  { icon: 'trending_up',     color: '#22c55e', bg: 'rgba(34,197,94,0.10)'  },
  LEAST_FREQUENT: { icon: 'trending_down',   color: '#ef4444', bg: 'rgba(239,68,68,0.10)'  },
  NULL_COUNT:     { icon: 'block',           color: '#94a3b8', bg: 'rgba(148,163,184,0.10)' },
  NON_NULL_COUNT: { icon: 'check_circle',    color: '#14b8a6', bg: 'rgba(20,184,166,0.10)' },
};

function formatValue(value, fnName) {
  if (value === null || value === undefined) return '—';

  // String-type results (MOST_FREQUENT, LEAST_FREQUENT)
  if (typeof value === 'string' && isNaN(Number(value))) {
    return value.length > 18 ? value.slice(0, 16) + '…' : value;
  }

  const num = Number(value);
  if (isNaN(num)) return String(value);

  // AVG — show 2 decimal places
  if (fnName === 'AVG') {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Large integers — abbreviate
  if (Number.isInteger(num) && Math.abs(num) >= 1_000_000) {
    if (Math.abs(num) >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (Math.abs(num) >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  }

  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatFunctionLabel(fnName) {
  return fnName
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

export default function KPICard({ columnName, fnName, value, index = 0 }) {
  const meta = KPI_META[fnName] || KPI_META.COUNT;
  const dispatch = useDispatch();

  return (
    <div
      className="kpi-card-v2"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Header row */}
      <div className="kpi-card-header-row">
        <span className="kpi-card-label">{columnName}</span>

        <button
          className="kpi-card-close"
          title="Remove KPI"
          onClick={(e) => { e.stopPropagation(); dispatch(removeKpi(index)); }}
          aria-label={`Remove KPI ${columnName}`}
        >
          <span className="material-symbols-rounded">close</span>
        </button>

        <div
          className="kpi-card-icon"
          style={{ background: meta.bg, color: meta.color }}
        >
          <span className="material-symbols-rounded">{meta.icon}</span>
        </div>
      </div>

      {/* Value */}
      <div className="kpi-card-value" style={{ color: meta.color }}>
        {formatValue(value, fnName)}
      </div>

      {/* Function badge */}
      <div className="kpi-card-badge" style={{ background: meta.bg, color: meta.color }}>
        {formatFunctionLabel(fnName)}
      </div>
    </div>
  );
}
