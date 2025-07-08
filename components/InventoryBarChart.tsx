'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InventoryData {
  category: string;
  transferred: number;
  total: number;
}

interface InventoryBarChartProps {
  data: InventoryData[];
}

const InventoryBarChart: React.FC<InventoryBarChartProps> = ({ data }) => {
  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <p className="text-sm text-blue-600">
            {`Transferred: ${formatNumber(data.transferred)}`}
          </p>
          <p className="text-sm text-gray-600">
            {`Total: ${formatNumber(data.total)}`}
          </p>
          <p className="text-sm text-green-600">
            {`Rate: ${((data.transferred / data.total) * 100).toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Transform data to include percentage
  const chartData = data.map(item => ({
    ...item,
    percentage: (item.transferred / item.total) * 100
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            stroke="#6b7280"
            fontSize={11}
            tick={{ fill: '#6b7280' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tick={{ fill: '#6b7280' }}
            tickFormatter={formatNumber}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="transferred" 
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryBarChart;