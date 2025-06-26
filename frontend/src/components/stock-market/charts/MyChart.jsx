import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MyScatterChart = (data) => {
  const [chartConfig, setChartConfig] = useState(null);
  const [selectedX, setSelectedX] = useState('');
  const [selectedY, setSelectedY] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('https://api.optionscreener.ir/api/options/intra_data_chart_config');
        const { data } = await response.json();
        setChartConfig(data);
        setSelectedX(data.x[0]?.name || ''); 
        setSelectedY(data.y[0]?.name || ''); 
      } catch (error) {
        console.error('Error fetching chart configuration:', error);
      }
    };
    fetchConfig();
  }, []);



  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { x, y, name, symbol_fa, strike_price } = payload[0].payload;
      const xLabel = chartConfig?.x.find((option) => option.name === selectedX)?.label || selectedX;
      const yLabel = chartConfig?.y.find((option) => option.name === selectedY)?.label || selectedY;
  
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
          <p>{`نماد سهم پایه: ${symbol_fa}`}</p>
          <p>{`قیمت اعمال: ${strike_price}`}</p>
       
        </div>
      );
    }
    return null;
  };

  if (!chartConfig) return <p>Loading...</p>;
console.log("data",data.data)
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg space-y-4">
      <div className="flex w-full">
        {/* Y-axis selection on the left */}
        <div className="flex flex-col space-y-2 mr-6 left-0">
          {chartConfig.y.map((yOption) => (
            <button
              key={yOption.name}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedY === yOption.name ? 'bg-[color:var(--color-primary)]   text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-[color:var(--color-bg-variant)] hover:text-white`}
              onClick={() => setSelectedY(yOption.name)}
              title={yOption.explanation}
            >
              {yOption.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={600}> {/* Change width to 100% */}
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey={selectedX}
              name={selectedX}
              label={{ value: selectedX, position: 'insideBottom', dy: 20 }}
              tick={{ fill: '#4a5568',position: 'insideBottom', dy: 10  }}
            />
            <YAxis
              type="number"
              dataKey={selectedY}
              name={selectedY}
              label={{ value: selectedY, angle: -90, position: 'insideCenter', dx: -40 }}
              tick={{ fill: '#4a5568',position: 'insideLeft', dx: -40 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Scatter Data" data={data.data} fill="#394258" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* X-axis selection below the chart */}
      <div className="flex flex-wrap justify-center space-x-2">
        {chartConfig.x.map((xOption) => (
          <button
            key={xOption.name}
            className={`px-4 py-2 my-2 rounded-lg font-medium ${
              selectedX === xOption.name ? 'bg-[color:var(--color-primary)] text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-[color:var(--color-bg-variant)] hover:text-white`}
            onClick={() => setSelectedX(xOption.name)}
            title={xOption.explanation}
          >
            {xOption.label}
          </button>
        ))}
      </div>
    </div>
  );
}  

export default MyScatterChart;
