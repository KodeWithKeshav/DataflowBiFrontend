import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateRandomColor } from '../../utils/Colours';

const COLORS = [];



function PieChartComponent() {
    const chartData = useSelector(state => state.chart.data);

    chartData.forEach(() => {
        COLORS.push(generateRandomColor())
    });

    const chartMetaData = useSelector(state=>state.chart.suggestedCharts).filter(chart=>chart.chartType === 'BAR');
    const xAxisKey = chartMetaData[0].xAxisColumn 
    const yAxisKey = chartMetaData[0].yAxisColumn 

    if (!chartData || chartData.length === 0) return <div>No data available</div>;

    return (
        <div style={{ width: '100%', height: '400px' }}>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        nameKey={xAxisKey} 
                        dataKey={yAxisKey}
                        outerRadius={120}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PieChartComponent;
