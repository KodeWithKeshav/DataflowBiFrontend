import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#1473e6','#0b61d6','#6fb1ff','#cfe7ff']

export default function ChartCard({title,data,xKey,yKey,type='bar'}){
  return (
    <div className="chart-card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{fontWeight:700}}>{title}</div>
      </div>
      <div style={{height:320}}>
        <ResponsiveContainer>
          {type==='bar' && (
            <BarChart data={data}>
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yKey} fill={COLORS[0]} />
            </BarChart>
          )}

          {type==='line' && (
            <LineChart data={data}>
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={yKey} stroke={COLORS[1]} strokeWidth={2} />
            </LineChart>
          )}

          {type==='pie' && (
            <PieChart>
              <Pie data={data} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={90} label>
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
