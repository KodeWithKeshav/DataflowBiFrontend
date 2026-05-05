import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// 1. Settings for the Gauge
const RADIAN = Math.PI / 180;
const innerRadius = 80;
const outerRadius = 140;
const chartData = [
  { name: 'Progress', value: 80, color: '#818cf8' }, // Indigo (The Value)
  { name: 'Remaining', value: 20, color: '#f1f5f9' }, // Light Gray (The Background)
];

// 2. Custom Needle Function (Calculates SVG path based on value)
const renderNeedle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => { total += v.value; });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + oR) / 2;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy;
  const xba = cx + r * sin;
  const yba = cy - r * cos;
  const xbb = cx - r * sin;
  const ybb = cy + r * cos;
  const xp = cx + length * cos;
  const yp = cy + length * sin;

  return [
    <circle key="needle-dot" cx={cx} cy={cy} r={r} fill={color} stroke="none" />,
    <path key="needle-path" d={`M${xba} ${yba}L${xbb} ${ybb}L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

const GaugeChartComponent = () => {
  // 3. Get KPI value from Redux (Assuming backend returns a percentage)
  const data = useSelector(state => state.chart.data);
  
  // Logic to extract a single value (e.g., from the first row of your SQL results)
  const targetValue = data && data.length > 0 ? Object.values(data[0])[1] : 0; 
  const maxValue = 100; // Adjust based on your KPI (e.g., 100 for %)

  const gaugeData = [
    { value: targetValue },
    { value: maxValue - targetValue },
  ];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center">
      
      <div className="mb-2 text-center">
        <h3 className="text-xl font-bold text-slate-800">Target Achievement</h3>
        <p className="text-sm text-slate-500">Current performance vs. goal</p>
      </div>

      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={gaugeData}
              cx="50%"
              cy="80%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              stroke="none"
            >
              <Cell fill="#818cf8" /> {/* Progress Color */}
              <Cell fill="#f1f5f9" /> {/* Background Color */}
            </Pie>
            {/* 4. Render the Needle */}
            {renderNeedle(targetValue, gaugeData, '50%', '80%', innerRadius, outerRadius, '#1e293b')}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Central Value Label */}
      <div className="text-3xl font-black text-slate-800 -mt-8">
        {targetValue}%
      </div>
    </div>
  );
};

export default GaugeChartComponent;
