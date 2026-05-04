import { useSelector } from 'react-redux';
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';

function BarChartComponent() {
    // Accessing the necessary parts of the state
    const chartData = useSelector(state => state.chart.data);
    const metaData = useSelector(state => state.chart.metaData);

    // If data is missing, return null or a loader
    if (!chartData || chartData.length === 0) return <div>No data available</div>;

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* Use the xAxisKey from your metadata ('gender') */}
                    <XAxis dataKey={metaData.xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* 
                        In your data objects, the numeric value is under the key 'value'.
                        If your metadata yAxisKey 'salary' is meant to map to 'value', 
                        ensure they match. 
                    */}
                    <Bar dataKey="value" fill="#8884d8" name="Salary" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent;
