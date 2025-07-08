'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface HealthData {
  status: string;
  count: number;
  percentage: number;
}

interface InventoryHealthProps {
  data: HealthData[];
}

const InventoryHealth: React.FC<InventoryHealthProps> = ({ data }) => {
  const colors = {
    'In Stock': '#10b981',
    'Low Stock': '#f59e0b',
    'Critical': '#ef4444'
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.status}</p>
          <p className="text-sm text-gray-600">
            {`Count: ${data.count.toLocaleString()}`}
          </p>
          <p className="text-sm text-gray-600">
            {`Percentage: ${data.percentage}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => (
    <ul className="flex flex-col space-y-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={index} className="flex items-center text-sm">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700">{entry.value}</span>
          <span className="ml-auto text-gray-500">
            {entry.payload.percentage}%
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[entry.status as keyof typeof colors]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-1 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors[item.status as keyof typeof colors] }}
              />
              <span className="text-sm text-gray-700">{item.status}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {item.count.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryHealth;