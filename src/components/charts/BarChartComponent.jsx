import { useSelector } from 'react-redux';
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';

function BarChartComponent() {
    const chartData = useSelector(state => state.chart.data);
    const metaData = useSelector(state => state.chart.metaData);

    if (!chartData || chartData.length === 0) return <div>No data available</div>;

    // Use yAxisKey for the legend label; fall back to "Value" if missing
    const legendLabel = metaData?.yAxisKey
        ? metaData.yAxisKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Value';

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={metaData.xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name={legendLabel} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent;
