import React from 'react';
import { useSelector } from "react-redux";
import { Scatter, ScatterChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function ScatterChartComponent() {
  const data = useSelector(state => state.chart.data);
  const metadata = useSelector(state => state.chart.metaData);

  if (!data || !metadata) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey={metadata.xAxisKey} name={metadata.xAxisKey} />
        <YAxis type="number" dataKey={metadata.yAxisKey} name={metadata.yAxisKey} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Data" data={data} fill="#1473e6" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
