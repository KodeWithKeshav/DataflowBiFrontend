import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
    Tooltip, Cell, ResponsiveContainer, LabelList 
} from 'recharts';

// Helper function to calculate Pearson Correlation Coefficient
const calculateCorrelation = (xArray, yArray) => {
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    const n = xArray.length;
    if (n === 0) return 0;

    for (let i = 0; i < n; i++) {
        sumX += xArray[i];
        sumY += yArray[i];
        sumXY += xArray[i] * yArray[i];
        sumX2 += xArray[i] * xArray[i];
        sumY2 += yArray[i] * yArray[i];
    }

    const numerator = (n * sumXY) - (sumX * sumY);
    const denominator = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));
    
    if (denominator === 0) return 0;
    return numerator / denominator;
};

const CorrelationMatrix = () => {
    const rawData = useSelector(state => state.chart.data);

    const { matrixData, numericKeys, error } = useMemo(() => {
        try {
            if (!rawData || rawData.length === 0) return { matrixData: [] };

            // 1. Find all numerical columns
            const firstRow = rawData[0];
            const numericCols = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'number');

            if (numericCols.length < 2) {
                return { error: 'Correlation Matrix requires at least 2 numerical columns.' };
            }

            // 2. Extract arrays of data for each numeric column
            const colData = {};
            numericCols.forEach(col => {
                colData[col] = rawData.map(row => row[col] || 0);
            });

            // 3. Build the Matrix (Compare every column against every other column)
            const processedData = [];
            numericCols.forEach((yCol) => {
                numericCols.forEach((xCol) => {
                    // If it's the exact same column, correlation is perfect (1.0)
                    const correlation = xCol === yCol 
                        ? 1.0 
                        : calculateCorrelation(colData[xCol], colData[yCol]);
                    
                    processedData.push({
                        x: xCol,
                        y: yCol,
                        value: parseFloat(correlation.toFixed(2)), // Keep 2 decimal places
                        // Absolute value determines color intensity
                        intensity: Math.abs(correlation)
                    });
                });
            });

            return { matrixData: processedData, numericKeys: numericCols };

        } catch (err) {
            console.error("Correlation processing error:", err);
            return { error: 'Failed to calculate correlations.' };
        }
    }, [rawData]);

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 rounded-xl shadow border border-slate-100 text-sm z-50">
                    <p className="font-bold text-slate-700 mb-1">
                        {data.y} &harr; {data.x}
                    </p>
                    <p className="text-slate-600">
                        Correlation: <span className="font-bold">{data.value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (error) {
        return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
    }
    
    if (!matrixData || matrixData.length === 0) {
        return <div className="p-4 text-slate-500">No data available to render Correlation Matrix.</div>;
    }

    // Dynamic height based on number of variables so boxes stay square
    const chartHeight = Math.max(400, numericKeys.length * 60);

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">Correlation Matrix</h3>
                <p className="text-sm text-slate-500">
                    Strength of relationships between numerical measures (1 = Strong Positive, -1 = Strong Negative)
                </p>
            </div>
            
            <div style={{ width: '100%', height: chartHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 80, left: 100 }}>
                        
                        <XAxis 
                            type="category" 
                            dataKey="x" 
                            axisLine={true}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            dy={10}
                        />
                        
                        <YAxis 
                            type="category" 
                            dataKey="y" 
                            axisLine={true}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        
                        {/* ZAxis range locks the size of the boxes */}
                        <ZAxis type="number" dataKey="intensity" range={[1200, 1200]} />
                        
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                        
                        <Scatter data={matrixData} shape="square">
                            {matrixData.map((entry, index) => {
                                // Positive correlation = Blue, Negative correlation = Red
                                // 0 correlation = Very faint grey
                                let color;
                                if (entry.value > 0) {
                                    color = `rgba(59, 130, 246, ${Math.max(0.1, entry.intensity)})`; // Blue
                                } else if (entry.value < 0) {
                                    color = `rgba(239, 68, 68, ${Math.max(0.1, entry.intensity)})`; // Red
                                } else {
                                    color = 'rgba(241, 245, 249, 1)'; // Neutral Slate
                                }

                                return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                            
                            <LabelList 
                                dataKey="value" 
                                position="center" 
                                style={{ fill: '#fff', fontSize: '13px', fontWeight: 'bold', textShadow: '0px 1px 2px rgba(0,0,0,0.4)' }} 
                            />
                        </Scatter>
                        
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CorrelationMatrix;
