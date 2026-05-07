import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateRandomColor } from '../../utils/Colours';

const UniversalDynamicChart = ({ chartType = "GROUPED" }) => {
    const rawData = useSelector(state => state.chart.data);

    const { processedData, dimensionKey, seriesKeys, error } = useMemo(() => {
        try {
            // 1. Initial safety check
            if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
                return { processedData: [], dimensionKey: '', seriesKeys: [] };
            }

            const firstRow = rawData[0];
            if (!firstRow || typeof firstRow !== 'object') {
                 return { processedData: [], dimensionKey: '', seriesKeys: [] };
            }

            // 2. Safe key extraction (ignoring nulls)
            const stringKeys = Object.keys(firstRow).filter(key => firstRow[key] !== null && typeof firstRow[key] === 'string');
            const numericKeys = Object.keys(firstRow).filter(key => firstRow[key] !== null && typeof firstRow[key] === 'number');

            //  Wide Format (e.g., store_name, marketing_spend, revenue)
            if (numericKeys.length > 1) {
                return {
                    processedData: rawData, 
                    dimensionKey: stringKeys[0] || Object.keys(firstRow)[0], 
                    seriesKeys: numericKeys 
                };
            }

            // Long Format (e.g., department, gender, value)
            if (stringKeys.length >= 2 && numericKeys.length === 1) {
                const primaryDim = stringKeys[0];  
                const secondaryDim = stringKeys[1]; 
                const valueKey = numericKeys[0];    

                // Pivot the data from Long to Wide
                const pivotedData = Object.values(rawData.reduce((acc, row) => {
                    const groupName = row[primaryDim] || "Unknown";
                    const seriesName = row[secondaryDim] || "Unknown";
                    
                    if (!acc[groupName]) {
                        acc[groupName] = { [primaryDim]: groupName };
                    }
                    acc[groupName][seriesName] = row[valueKey] || 0;
                    return acc;
                }, {}));

                // Extract unique series safely
                const uniqueSeries = Array.from(new Set(rawData.map(row => row[secondaryDim]).filter(Boolean)));

                return {
                    processedData: pivotedData,
                    dimensionKey: primaryDim,
                    seriesKeys: uniqueSeries
                };
            }

            // Fallback for single measure / single dimension
            return {
                processedData: rawData,
                dimensionKey: stringKeys[0] || 'name',
                seriesKeys: numericKeys
            };
        } catch (err) {
            console.error("Chart data parsing error:", err);
            return { processedData: [], dimensionKey: '', seriesKeys: [], error: err.message };
        }
        
    // rawData MUST be in the dependency array!
    }, [rawData]); 

    
    // Render Configuration
    if (error) return <div className="p-4 text-red-500 bg-red-50 rounded-xl">Error processing chart data.</div>;
    if (!processedData || processedData.length === 0) return <div className="p-4 text-slate-500">No appropriate data present to render chart.</div>;

    const colors = [];
     rawData.forEach(() => {
            colors.push(generateRandomColor())
        });
    const isStacked = chartType === "STACKED";

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey={dimensionKey} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 12}} 
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px'}} />
                        
                        {seriesKeys.map((key, index) => (
                            <Bar 
                                key={key}
                                dataKey={key}
                                stackId={isStacked ? "stack" : undefined} 
                                fill={colors[index]}
                                barSize={isStacked ? 40 : 20}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UniversalDynamicChart;
