import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateRandomColor } from '../../utils/Colours';

const IndependentLineChart = () => {
  const data = useSelector(state => state.chart.data);
  const tableColumns = useSelector(state =>state.table.activeTable.columns);

  if (!data || data.length === 0) {
    return <div className="p-6 text-slate-500 italic">No data available for analysis...</div>;
  }

  const allKeys = Object.keys(data[0]);
  const measureKeys = allKeys.filter(key => key !== 'date_period');
  const dateKeys = allKeys.filter(key=> key == 'date_period')

  const xKey = dateKeys[0];
  const yKey = measureKeys[0]

 ;

  const colors = [];

  data.forEach(() => {
    colors.push(generateRandomColor())
  });

  return (
    <div className="w-full h-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
 
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Dynamic Trend Analysis</h3>
        <p className="text-sm text-slate-500">Visualizing data aggregated by date period</p>
      </div>
    
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
          >
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
              itemStyle={{ fontWeight: 600 }}
            />
            
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              wrapperStyle={{paddingBottom: '20px'}} 
            />
            
            {measureKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone"
                name={key.replace(/_/g, ' ').toUpperCase()} 
                dataKey={key} 
                stroke={colors[index]} 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IndependentLineChart;
