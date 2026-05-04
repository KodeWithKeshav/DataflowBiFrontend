import { useSelector } from "react-redux";
import BarChartComponent from "./charts/BarChartComponent";
import StackedBarChartComponent from "./charts/StackedBarChartComponent";
import GroupedBarChartComponent from "./charts/GroupedBarChartComponent";
import LineChartComponent from "./charts/LineChartComponent";
import PieChartComponent from "./charts/PieChartComponent";
import ScatterChartComponent from "./charts/ScatterChartComponent";

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

  const SelectedChart = CHART_MAP[activeType?.toUpperCase()] || (() => <div>Unsupported Chart</div>);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm">
      <div className="text-lg font-semibold mb-4 capitalize">
        {activeType?.replace('_', ' ')}
      </div>
      <div style={{ height: '320px', width: '100%' }}>
          <SelectedChart />
      </div>
    </div>
  );
}
