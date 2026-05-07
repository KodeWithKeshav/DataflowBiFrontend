import React from 'react';
import { useSelector } from 'react-redux';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { generateRandomColor } from '../../utils/Colours';

const DynamicAreaChart = () => {
  const data = useSelector(state => state.chart.data);
  
  if (!data || data.length === 0) {
    return <div className="p-6 text-slate-500 italic">No data available for area analysis...</div>;
  }

  const allKeys = Object.keys(data[0]);
  const measureKeys = allKeys.filter(key => key !== 'date_period');
  const dateKeys = allKeys.filter(key=> key == 'date_period')

  const xKey = measureKeys[0]
  const yKey = dateKeys[0]

  const colorMap = [
    { id: 'colorUv', stroke: generateRandomColor(), fill: generateRandomColor(), }, 
    { id: 'colorPv', stroke: generateRandomColor(), fill: generateRandomColor(),}, 
    { id: 'colorAmt', stroke: generateRandomColor(), fill:generateRandomColor(), } 
  ];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Volume Analysis</h3>
        <p className="text-sm text-slate-500">Visualizing cumulative trends over time</p>
      </div>
      
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 20, left: 30, bottom: 30 }}
          >
            <defs>
              {measureKeys.map((key, index) => {
                const colors = colorMap[index % colorMap.length];
                return (
                  <linearGradient key={`grad-${key}`} id={colors.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.fill} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.fill} stopOpacity={0}/>
                  </linearGradient>
                );
              })}
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="date_period" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}} 
              dy={10} 
               label={{ 
                  value: xKey.toUpperCase().replace(/_/g, ' '), 
                  position: 'insideBottom', 
                  offset: -20, 
                  fill: '#64748b',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}} 
              dx={-10}
              label={{ 
                  value: yKey.toUpperCase().replace(/_/g, ' '), 
                  position: 'insideBottom', 
                  offset: -60, 
                  fill: '#64748b',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
            />
            
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
            
            {measureKeys.map((key, index) => {
              const colors = colorMap[index % colorMap.length];
              return (
                <Area 
                  key={key}
                  type="monotone"
                  name={key.replace(/_/g, ' ').toUpperCase()}
                  dataKey={key} 
                  stroke={colors.stroke} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill={`url(#${colors.id})`} 
                  stackId="1" 
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DynamicAreaChart;
