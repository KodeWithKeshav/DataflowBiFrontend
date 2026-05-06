import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';

const BubbleChartComponent = () => {
    const longData = useSelector(state => state.chart.data);
    const { chartData, labelKey, xKey, yKey, zKey, error } = useMemo(() => {
        try {
            if (!longData || !Array.isArray(longData) || longData.length === 0) {
                return { chartData: [] };
            }

            const firstRow = longData[0];
            if (typeof firstRow !== 'object' || firstRow === null) {
                return { chartData: [] };
            }

            const stringKeys = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'string');
            const numericKeys = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'number');

            if (numericKeys.length < 3) {
                return { error: 'Bubble Chart requires at least 3 numerical columns.' };
            }

            const labelK = stringKeys.length > 0 ? stringKeys[0] : null;
            
            const xK = numericKeys[0]; // X-Axis placement
            const yK = numericKeys[1]; // Y-Axis placement
            const zK = numericKeys[2]; // Bubble Size placement

            // Map data to the format Recharts expects
            const processedData = longData.map((item, index) => ({
                name: labelK ? item[labelK] : `Point ${index + 1}`,
                x: item[xK] || 0,
                y: item[yK] || 0,
                z: item[zK] || 0,
                originalData: item // Keep reference for tooltip
            }));

            return { 
                chartData: processedData, 
                labelKey: labelK || 'Index',
                xKey: xK, 
                yKey: yK, 
                zKey: zK
            };

        } catch (err) {
            console.error("Bubble Chart processing error:", err);
            return { error: 'Failed to process data.' };
        }
    }, [longData]);

    // 3. Custom Tooltip to show all 4 dimensions cleanly
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 text-sm">
                    <p className="font-bold text-slate-800 mb-2 pb-2 border-b border-slate-100">
                        {data.name}
                    </p>
                    <div className="flex flex-col gap-1">
                        <p className="text-slate-600">
                            <span className="font-semibold">{xKey}:</span> {data.x}
                        </p>
                        <p className="text-slate-600">
                            <span className="font-semibold">{yKey}:</span> {data.y}
                        </p>
                        <p className="text-indigo-600 font-semibold mt-1">
                            <span>{zKey} (Size):</span> {data.z}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Array of colors to make the bubbles distinct if you want to color by category
    const colors = ["#818cf8", "#34d399", "#f472b6", "#fbbf24", "#38bdf8", "#c084fc"];

    // 4. Render States
    if (error) {
        return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
    }
    
    if (!chartData || chartData.length === 0) {
        return <div className="p-4 text-slate-500">No data available to render Bubble Chart.</div>;
    }

    // Format keys for display
    const formatName = (key) => key.toUpperCase().replace(/_/g, ' ');

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">Multi-Dimensional Analysis</h3>
                <p className="text-sm text-slate-500">
                    X: <b>{formatName(xKey)}</b> | Y: <b>{formatName(yKey)}</b> | Size: <b>{formatName(zKey)}</b>
                </p>
            </div>
            
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        
                        <XAxis 
                            type="number" 
                            dataKey="x" 
                            name={formatName(xKey)} 
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            label={{ 
                                value: formatName(xKey), 
                                position: 'insideBottom', 
                                offset: -20,
                                fill: '#64748b',
                                fontSize: 13,
                                fontWeight: 'bold'
                            }}
                        />
                        
                        <YAxis 
                            type="number" 
                            dataKey="y" 
                            name={formatName(yKey)} 
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            label={{ 
                                value: formatName(yKey), 
                                angle: -90, 
                                position: 'insideLeft', 
                                offset: -20,
                                fill: '#64748b',
                                fontSize: 13,
                                fontWeight: 'bold',
                                style: { textAnchor: 'middle' }
                            }}
                        />

                        {/* ZAxis is the magic for Bubble Charts. 
                            'range' dictates the min and max pixel area of the bubbles */}
                        <ZAxis 
                            type="number" 
                            dataKey="z" 
                            range={[50, 2000]} 
                            name={formatName(zKey)} 
                        />
                        
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                        <Legend verticalAlign="top" align="right" />
                        
                        <Scatter 
                            name="Data Points" 
                            data={chartData} 
                            fill="#6366f1"
                            opacity={0.7}
                        >
                            {/* Optional: Give each bubble a different color based on its index */}
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={colors[index % colors.length]} 
                                />
                            ))}
                        </Scatter>
                        
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BubbleChartComponent;
