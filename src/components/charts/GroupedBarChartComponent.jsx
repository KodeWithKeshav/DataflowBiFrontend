import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function GroupedBarChart() {
    const chartData = useSelector(state => state.chart.data);
    const { xAxisKey, seriesKeys } = useSelector(state => state.chart.metaData);

    const colors = ['#8884d8', '#82ca9d', '#ffc658'];

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Map through seriesKeys to create side-by-side bars */}
                    {seriesKeys.map((key, index) => (
                        <Bar 
                            key={key} 
                            dataKey={key} 
                            fill={colors[index % colors.length]} 
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
