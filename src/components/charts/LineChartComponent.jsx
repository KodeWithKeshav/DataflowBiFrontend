import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartComponent() {
    const chartData = useSelector(state => state.chart.data);
    const { xAxisKey, seriesKeys } = useSelector(state => state.chart.metaData);

    if (!chartData || chartData.length === 0) return <div>No data available</div>;

    const colors = ['#8884d8', '#82ca9d', '#ffc658'];

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Dynamically generate lines for each series key */}
                    {seriesKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone" // Creates a smooth curve
                            dataKey={key}
                            stroke={colors[index % colors.length]}
                            activeDot={{ r: 8 }} // Enlarges dot on hover
                            strokeWidth={2}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartComponent;
