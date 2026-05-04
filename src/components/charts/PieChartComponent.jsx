import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PieChartComponent() {
    const chartData = useSelector(state => state.chart.data);
    const metaData = useSelector(state => state.chart.metaData);

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
                        // nameKey maps to 'gender' (the label)
                        nameKey={metaData.xAxisKey} 
                        // dataKey maps to 'value' (the number)
                        dataKey="value"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
