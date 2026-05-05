import React from 'react';
import { useSelector } from 'react-redux';
import KPICard from './KPICard';

export default function KPIRow() {
  const { kpis, loading, error } = useSelector(state => state.kpi);

  if (!kpis || kpis.length === 0) {
    if (loading) {
      return (
        <div className="kpi-row-v2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="kpi-card-v2 kpi-skeleton">
              <div className="kpi-skeleton-line short" />
              <div className="kpi-skeleton-line long" />
              <div className="kpi-skeleton-line badge" />
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  if (error) {
    return (
      <div className="kpi-row-v2">
        <div className="kpi-error">
          <span className="material-symbols-rounded">warning</span>
          Failed to load KPIs
        </div>
      </div>
    );
  }

  return (
    <div className="kpi-row-v2">
      {kpis.map((kpi, idx) => (
        <KPICard
          key={`${kpi.columnName}-${kpi.function}`}
          columnName={kpi.columnName}
          fnName={kpi.function}
          value={kpi.value}
          index={idx}
        />
      ))}
    </div>
  );
}
