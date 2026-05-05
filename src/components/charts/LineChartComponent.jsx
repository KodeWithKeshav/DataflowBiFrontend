import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IndependentLineChart = () => {
  const data = useSelector(state => state.chart.data);

  if (!data || data.length === 0) {
    return <div className="p-6 text-slate-500 italic">No data available for analysis...</div>;
  }

  const allKeys = Object.keys(data[0]);
  const measureKeys = allKeys.filter(key => key !== 'date_period');

  const colors = ["#818cf8", "#34d399", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
 
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Dynamic Trend Analysis</h3>
        <p className="text-sm text-slate-500">Visualizing data aggregated by date period</p>
      </div>
    
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
         
            <XAxis 
              dataKey="date_period" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}} 
              dy={10} 
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 12}} 
              dx={-10}
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
                stroke={colors[index % colors.length]} 
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
