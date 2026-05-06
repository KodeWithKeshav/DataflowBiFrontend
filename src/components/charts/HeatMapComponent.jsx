import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const HeatMapComponent = () => {
    const longData = useSelector(state => state.chart.data);

    const { series, error } = useMemo(() => {
        try {
            if (!longData || !Array.isArray(longData) || longData.length === 0) {
                return { series: [] };
            }

            const firstRow = longData[0];
            const stringKeys = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'string');
            const numericKeys = Object.keys(firstRow).filter(key => typeof firstRow[key] === 'number');

            if (stringKeys.length < 2 || numericKeys.length < 1) {
                return { error: 'Heatmap requires 2 categorical columns and 1 numeric column.' };
            }

            // xKey = columns (e.g., 'day'), yKey = rows (e.g., 'product')
            const xKey = stringKeys[0]; 
            const yKey = stringKeys[1]; 
            const valueKey = numericKeys[0]; 

            const xLabels = [...new Set(longData.map(item => item[xKey]))];
            const yLabels = [...new Set(longData.map(item => item[yKey]))];

            // Transform into ApexCharts Series format
            const formattedSeries = yLabels.map(yLabel => {
                return {
                    name: yLabel,
                    data: xLabels.map(xLabel => {
                        const match = longData.find(item => item[xKey] === xLabel && item[yKey] === yLabel);
                        return {
                            x: xLabel,
                            y: match ? match[valueKey] : 0
                        };
                    })
                };
            });

            return { series: formattedSeries };
        } catch (err) {
            console.error("Data processing error:", err);
            return { error: 'Failed to process data.' };
        }
    }, [longData]);

    // ApexCharts Configuration Options
    const options = {
        chart: {
            type: 'heatmap',
            toolbar: { show: true }
        },
        dataLabels: { enabled: true, style: { colors: ['#fff'] } },
        colors: ["#4356FF"], 
        title: { text: 'Data Heatmap Distribution' },
        xaxis: { type: 'category' },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 4,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [{ from: 0, to: 1000000, name: 'Sales', color: '#4356FF' }]
                }
            }
        }
    };

    if (error) return <div className="p-4 text-red-500 bg-red-50">{error}</div>;
    if (!series || series.length === 0) return <div className="p-4">No data available.</div>;

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <Chart 
                options={options} 
                series={series} 
                type="heatmap" 
                height={350} 
            />
        </div>
    );
};

export default HeatMapComponent;
