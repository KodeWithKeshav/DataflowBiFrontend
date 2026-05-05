import React, { useMemo } from 'react';
import HeatMap from 'react-heatmap-grid';
import { useSelector } from 'react-redux';

const SalesHeatmap = () => {
    // 1. Get the raw data array from the Redux store
    const longData = useSelector(state => state.chart.data);

    // 2. Safely and dynamically transform the data
    const { xLabels, yLabels, data, error } = useMemo(() => {
        try {
            // Safety check: ensure we have valid data to process
            if (!longData || !Array.isArray(longData) || longData.length === 0) {
                return { xLabels: [], yLabels: [], data: [] };
            }

            const firstRow = longData[0];
            if (typeof firstRow !== 'object' || firstRow === null) {
                 return { xLabels: [], yLabels: [], data: [] };
            }

            // 3. DYNAMIC KEY IDENTIFICATION: Find the keys instead of hardcoding them
            const stringKeys = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'string');
            const numericKeys = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'number');

            // A heatmap requires exactly 2 string/category columns and 1 numeric column
            if (stringKeys.length < 2 || numericKeys.length < 1) {
                // Return an error if the data shape is wrong for a heatmap
                return { error: 'Heatmap requires 2 categorical columns and 1 numeric column.' };
            }
            
            const xKey = stringKeys[0]; // e.g., 'day'
            const yKey = stringKeys[1]; // e.g., 'product'
            const valueKey = numericKeys[0]; // e.g., 'sales'

            // --- The rest of your transformation logic, now using dynamic keys ---
            
            const xLabels = [...new Set(longData.map(item => item[xKey]))];
            const yLabels = [...new Set(longData.map(item => item[yKey]))];
            
            const xLabelMap = xLabels.reduce((acc, label, index) => ({...acc, [label]: index }), {});
            const yLabelMap = yLabels.reduce((acc, label, index) => ({...acc, [label]: index }), {});

            const grid = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(null));

            longData.forEach((item) => {
                const x = xLabelMap[item[xKey]];
                const y = yLabelMap[item[yKey]];
                if (x !== undefined && y !== undefined) {
                    grid[y][x] = item[valueKey];
                }
            });

            return { xLabels, yLabels, data: grid };

        } catch (err) {
            console.error("Heatmap data processing error:", err);
            return { error: 'Failed to process data.' };
        }
    }, [longData]); // CRITICAL: The dependency array ensures this runs when Redux data updates

    // 4. Render based on processing results
    if (error) {
        return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
    }
    
    if (!data || data.length === 0) {
        return <div className="p-4 text-slate-500">No data available to render heatmap.</div>;
    }

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-800">Data Heatmap</h3>
                <p className="text-sm text-slate-500">Visualizing value distribution across two dimensions</p>
            </div>
            
            <div className="text-sm">
                <HeatMap
                    xLabels={xLabels}
                    yLabels={yLabels}
                    data={data}
                    // Styling
                    xLabelsLocation={"bottom"}
                    yLabelWidth={100}
                    xLabelWidth={80}
                    cellStyle={(background, value, min, max) => ({
                        background: `rgba(67, 86, 255, ${value === null || min === max ? 0 : 1 - (max - value) / (max - min)})`,
                        fontSize: "12px",
                        color: "#fff",
                        borderRadius: "4px",
                        border: "1px solid #f1f5f9"
                    })}
                    cellRender={(value) => value !== null && <div>{value}</div>}
                />
            </div>
        </div>
    );
};

export default SalesHeatmap;
