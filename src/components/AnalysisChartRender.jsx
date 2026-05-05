import { useSelector } from "react-redux";
import BarChartComponent from "./charts/BarChartComponent";
import StackedBarChartComponent from "./charts/StackedBarChartComponent";
import GroupedBarChartComponent from "./charts/GroupedBarChartComponent";
import LineChartComponent from "./charts/LineChartComponent";
import PieChartComponent from "./charts/PieChartComponent";
import ScatterChartComponent from "./charts/ScatterChartComponent";
import BorderGlow from "./BorderGlow";

export default function AnalysisChartRenderer() {
  const activeType = useSelector(state => state.chart.activeChart);
  
  const CHART_MAP = {
    'BAR': BarChartComponent,
    'STACKED_BAR': StackedBarChartComponent,
    'GROUPED_BAR': GroupedBarChartComponent, 
    'LINE': LineChartComponent, 
    'SCATTER_PLOT': ScatterChartComponent,
    'PIE': PieChartComponent,   
  };

  const SelectedChart = CHART_MAP[activeType?.toUpperCase()] || null;

  if (!SelectedChart) {
    return (
      <BorderGlow animated={true}>
        <div className="empty-state" style={{minHeight: 200}}>
          <div className="empty-state-icon">
            <span className="material-symbols-rounded">bar_chart</span>
          </div>
          <div className="empty-state-title">No Chart Selected</div>
          <div className="empty-state-desc">Apply column selection and pick a chart type from suggestions.</div>
        </div>
      </BorderGlow>
    );
  }

  return (
    <BorderGlow style={{marginTop: 16}}>
      <div className="chart-card-header">
        <div className="chart-card-title">
          <span className="material-symbols-rounded" style={{fontSize:18, verticalAlign:'middle', marginRight:6, color:'var(--blue-500)'}}>bar_chart</span>
          {activeType?.replace('_', ' ')}
        </div>
        <span className="section-badge">
          <span className="material-symbols-rounded" style={{fontSize:14}}>insights</span>
          {activeType}
        </span>
      </div>
      <div style={{ height: '320px', width: '100%' }}>
          <SelectedChart />
      </div>
    </BorderGlow>
  );
}
