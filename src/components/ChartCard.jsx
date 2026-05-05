import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#1473e6','#0b61d6','#6fb1ff','#a8d1ff','#3b8def']

const customTooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2eaf4',
  borderRadius: '10px',
  boxShadow: '0 8px 24px rgba(10, 37, 64, 0.1)',
  padding: '8px 14px',
  fontSize: '13px',
  fontFamily: 'Inter, sans-serif',
}

export default function ChartCard({title,data,xKey,yKey,type='bar'}){
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title">{title}</div>
        <span className="section-badge">
          <span className="material-symbols-rounded" style={{fontSize:14}}>bar_chart</span>
          {type}
        </span>
      </div>
      <div style={{height:320}}>
        <ResponsiveContainer>
          {type==='bar' && (
            <BarChart data={data}>
              <XAxis dataKey={xKey} tick={{fontSize:12,fill:'#8496ad'}} axisLine={{stroke:'#e2eaf4'}} tickLine={false} />
              <YAxis tick={{fontSize:12,fill:'#8496ad'}} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={customTooltipStyle} cursor={{fill:'rgba(20,115,230,0.05)'}} />
              <Bar dataKey={yKey} fill={COLORS[0]} radius={[6,6,0,0]} />
            </BarChart>
          )}

          {type==='line' && (
            <LineChart data={data}>
              <XAxis dataKey={xKey} tick={{fontSize:12,fill:'#8496ad'}} axisLine={{stroke:'#e2eaf4'}} tickLine={false} />
              <YAxis tick={{fontSize:12,fill:'#8496ad'}} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line type="monotone" dataKey={yKey} stroke={COLORS[1]} strokeWidth={2.5} dot={{fill:'#fff',stroke:COLORS[1],strokeWidth:2,r:4}} activeDot={{r:6,fill:COLORS[0]}} />
            </LineChart>
          )}

          {type==='pie' && (
            <PieChart>
              <Pie data={data} dataKey={yKey} nameKey={xKey} cx="50%" cy="50%" outerRadius={90} innerRadius={40} label paddingAngle={3} cornerRadius={4}>
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{fontSize:13,fontFamily:'Inter, sans-serif'}} />
              <Tooltip contentStyle={customTooltipStyle} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
