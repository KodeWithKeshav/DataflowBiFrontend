import React from 'react';
import { useSelector } from 'react-redux';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { generateRandomColor } from '../../utils/Colours';

const SqlDonutChart = () => {
  // 1. Fetching data from your Redux store
  const data = useSelector(state => state.chart.data);
  
  if (!data || data.length === 0) {
    return <div className="p-10 text-center text-slate-400">Waiting for SQL results...</div>;
  }

  /**
   * 2. DATA MAPPING
   * We assume your SQL returns rows like: { "label_column": "CategoryName", "value_column": 123 }
   * We dynamically find which column is the 'String' (label) and which is the 'Number' (value)
   */
  const keys = Object.keys(data[0]);
  const labelKey = keys.find(k => typeof data[0][k] === 'string') || keys[0];
  const valueKey = keys.find(k => typeof data[0][k] === 'number') || keys[1];

  // 3. Professional Color Palette
  const COLORS = [];
  data.forEach(() => {
    COLORS.push(generateRandomColor())
  });

  // 4. Calculate Total for the center display
  const total = data.reduce((sum, item) => sum + Number(item[valueKey]), 0);

  return (
    <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Distribution Analysis</h3>
        <p className="text-xs text-slate-400">Data source: Dynamic SQL Query</p>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={8}
              dataKey={valueKey}
              nameKey={labelKey}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={COLORS[index]} 
                   className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            
            <Tooltip 
              contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            
            <Legend verticalAlign="bottom" align="center" iconType="circle" />

            {/* Central Total Label */}
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-0.5em" fontSize="12" fontWeight="500" fill="#94a3b8">TOTAL</tspan>
              <tspan x="50%" dy="1.5em" fontSize="22" fontWeight="900" fill="#1e293b">
                {total > 1000 ? `${(total / 1000).toFixed(1)}k` : total}
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SqlDonutChart;
