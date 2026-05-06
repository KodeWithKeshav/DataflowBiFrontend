import React from 'react';
import { useSelector } from 'react-redux';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, 
  ZAxis
} from 'recharts';

const DynamicScatterPlot = () => {
  const data = useSelector(state => state.chart.data);
  const tableColumns = useSelector(state =>state.table.activeTable.columns);

  const tableNumericalColumns = tableColumns.filter(column=> column.logicalType  === 'NUMBER').map(column=>column.columnName);
  
  if (!data || data.length === 0) {
    return <div className="p-6 text-slate-500 italic text-center">No data for Scatter plot...</div>;
  }

  const allKeys = Object.keys(data[0]);
  const measureKeys = allKeys.filter(key => tableNumericalColumns.includes(key));
  const dimensionKey = allKeys.find(key => !tableNumericalColumns.includes(key));

  if(measureKeys.length < 2){
    return <div>No graph possible</div>
  }

  const xKey = measureKeys[0]
  const yKey = measureKeys[1]

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      
      <div className="mb-6">
        {/* <h3 className="text-xl font-bold text-slate-800">Correlation Analysis</h3> */}
        <p className="text-sm text-slate-500">
          Mapping <b>{xKey.replace(/_/g, ' ')}</b> vs <b>{yKey.replace(/_/g, ' ')}</b>
        </p>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
         
            <XAxis 
              type={typeof data[0][xKey] === 'number' ? 'number' : 'category'}
              dataKey={xKey} 
              name={xKey.toUpperCase()} 
              stroke="#64748b"
              fontSize={12}
              tickLine={true}
              axisLine={true}
              label={{ 
                  value: xKey.toUpperCase().replace(/_/g, ' '), 
                  position: 'insideBottom', 
                  offset: -10, 
                  fill: '#64748b',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
            />
        
            <YAxis 
              type="number" 
              dataKey={yKey} 
              name={yKey.toUpperCase()} 
              stroke="#64748b"
              fontSize={12}
              tickLine={true}
              axisLine={true}
                label={{ 
                  value: yKey.toUpperCase().replace(/_/g, ' '), 
                  angle: -90, 
                  position: 'insideLeft', 
                  offset: 10,
                  fill: '#64748b',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
            />

            {dimensionKey && (
              <ZAxis type="category" dataKey={dimensionKey} name={dimensionKey.toUpperCase()} />
            )}
            
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            
            <Legend verticalAlign="top" align="right" />

            <Scatter 
              name="Data Points" 
              data={data} 
              fill="#6366f1" 
              fillOpacity={0.6}
              line={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DynamicScatterPlot;
