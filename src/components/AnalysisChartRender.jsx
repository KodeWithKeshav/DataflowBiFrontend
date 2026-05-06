import { useSelector } from "react-redux";
import BarChartComponent from "./charts/BarChartComponent";
import StackedBarChartComponent from "./charts/StackedBarChartComponent";
import GroupedBarChartComponent from "./charts/GroupedBarChartComponent";
import LineChartComponent from "./charts/LineChartComponent";
import PieChartComponent from "./charts/PieChartComponent";
import ScatterChartComponent from "./charts/ScatterChartComponent";
import BorderGlow from "./BorderGlow";
import HeatMapComponent from "./charts/HeatMapComponent";
import DynamicAreaChart from "./charts/AreaChartComponent";
import DonutChartComponent from "./charts/DonutChartComponent";
import BubbleChartComponent from "./charts/BubbleChartComponent";
import CorrelationMatrix from "./charts/CorrelationMatrixComponent";

export default function AnalysisChartRenderer() {
  const activeTypes = useSelector(state => state.chart.activeCharts || []);

  const CHART_MAP = {
    'BAR': BarChartComponent,
    'STACKED_BAR': StackedBarChartComponent,
    'GROUPED_BAR': GroupedBarChartComponent, 
    'LINE': LineChartComponent, 
    'AREA': DynamicAreaChart,
    'SCATTER_PLOT': ScatterChartComponent,
    'PIE': PieChartComponent,   
    'HEATMAP': HeatMapComponent,
    'DONUT': DonutChartComponent,
    'BUBBLE_CHART':BubbleChartComponent,
    'CORRELATION_MATRIX': CorrelationMatrix
  };

  if (!activeTypes || activeTypes.length === 0) {
    return (
      <BorderGlow animated={true}>
        <div className="empty-state" style={{ minHeight: 200 }}>
          <div className="empty-state-icon">
            <span className="material-symbols-rounded">bar_chart</span>
          </div>
          <div className="empty-state-title">No Chart Selected</div>
          <div className="empty-state-desc">Apply column selection and pick one or more chart types from suggestions.</div>
        </div>
      </BorderGlow>
    );
  }

  return (
    <BorderGlow style={{ marginTop: 16 }}>
      <div style={{ maxHeight: '800px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0, padding: '8px 8px 0' }}>
        {activeTypes.map((type, idx) => {
          const SelectedChart = CHART_MAP[type?.toUpperCase()] || null;
          const isLast = idx === activeTypes.length - 1;
          return (
            <div
              key={type}
              className="h-full w-full"
              style={{
                paddingBottom: isLast ? 8 : 24,
                marginBottom: isLast ? 0 : 24,
                borderBottom: isLast ? 'none' : '1px solid var(--border-light)',
              }}
            >
              <div className="chart-card-header">
                <div className="chart-card-title">
                  <span className="material-symbols-rounded" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 6, color: 'var(--blue-500)' }}>bar_chart</span>
                  {type?.replace(/_/g, ' ')}
                </div>
                <span className="section-badge">
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>insights</span>
                  {type}
                </span>
              </div>
              <div className="h-full w-full p-5">
                {SelectedChart ? <SelectedChart /> : (
                  <div style={{ padding: 16 }}>Unsupported chart: {type}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </BorderGlow>
  );
}
