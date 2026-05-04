import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StackedBarChart() {
    const chartData = useSelector(state => state.chart.data);
    const { xAxisKey, seriesKeys } = useSelector(state => state.chart.metaData);

    const colors = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {seriesKeys.map((key, index) => (
                        <Bar 
                            key={key} 
                            dataKey={key} 
                            stackId="a" 
                            fill={colors[index % colors.length]} 
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
