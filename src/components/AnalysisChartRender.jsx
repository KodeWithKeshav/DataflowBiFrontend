import { useSelector } from "react-redux";
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
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

  const chartRefs = useRef({})

  const exportAll = async () => {
    try {
      const pdf = new jsPDF('landscape', 'pt', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      let added = false
      for (let i = 0; i < activeTypes.length; i++) {
        const el = chartRefs.current[i]
        if (!el) continue
        // capture
        // eslint-disable-next-line no-await-in-loop
        const canvas = await html2canvas(el, {scale:2})
        const imgData = canvas.toDataURL('image/png')
        const imgProps = pdf.getImageProperties(imgData)
        const imgWidth = pdfWidth
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width
        const marginY = (pdfHeight - imgHeight) / 2
        if (added) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, marginY > 0 ? marginY : 0, imgWidth, imgHeight)
        added = true
      }
      if (added) pdf.save('all_charts.pdf')
    } catch (err) {
      console.error('Export all charts failed', err)
    }
  }

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
        <div style={{display:'flex',justifyContent:'flex-end',padding:'0 8px 20px'}}>
          <button className="btn-export-all" onClick={exportAll}>Export All PDFs</button>
        </div>
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
              <div className="chart-card-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div className="chart-card-title">
                  <span className="material-symbols-rounded" style={{ fontSize: 18, verticalAlign: 'middle', marginRight: 6, color: 'var(--blue-500)' }}>bar_chart</span>
                  {type?.replace(/_/g, ' ')}
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span className="section-badge">
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>insights</span>
                    {type}
                  </span>
                  <button onClick={async () => {
                    try {
                      const el = chartRefs.current && chartRefs.current[idx]
                        if (!el) return
                      const canvas = await html2canvas(el, {scale:2})
                      const imgData = canvas.toDataURL('image/png')
                      const pdf = new jsPDF('landscape', 'pt', 'a4')
                      const pdfWidth = pdf.internal.pageSize.getWidth()
                      const pdfHeight = pdf.internal.pageSize.getHeight()
                      const imgProps = pdf.getImageProperties(imgData)
                      const imgWidth = pdfWidth
                      const imgHeight = (imgProps.height * imgWidth) / imgProps.width
                      const marginY = (pdfHeight - imgHeight) / 2
                      pdf.addImage(imgData, 'PNG', 0, marginY > 0 ? marginY : 0, imgWidth, imgHeight)
                      const safeTitle = (type || 'chart').replace(/[^a-z0-9\-_. ]/gi, '_')
                      pdf.save(`${safeTitle}.pdf`)
                    } catch (err) {
                      console.error('Export PDF failed', err)
                    }
                  }} className="btn-export">Export PDF</button>
                </div>
              </div>
              <div className="h-full w-full p-5" ref={el => (chartRefs.current[idx] = el)}>
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

