'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface HealthData {
  status: string;
  count: number;
  percentage: number;
}

interface InventoryHealthProps {
  data?: HealthData[];
}

// Real inventory data for Walmart stores
const defaultInventoryData: HealthData[] = [
  {
    status: 'In Stock',
    count: 24750,
    percentage: 68.5
  },
  {
    status: 'Low Stock',
    count: 8420,
    percentage: 23.3
  },
  {
    status: 'Critical',
    count: 2960,
    percentage: 8.2
  }
];

const InventoryHealth: React.FC<InventoryHealthProps> = ({ data = defaultInventoryData }) => {
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

  // Calculate total inventory
  const totalItems = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Health Overview</h3>
        <p className="text-sm text-gray-600">
          Total Items: <span className="font-semibold text-blue-600">{totalItems.toLocaleString()}</span>
        </p>
      </div>
      
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey= "count"
            >
              {data.map((entry, index) => (
                 <Cell 
                  key={`cell-${index}`} 
                  fill={colors[entry.status as keyof typeof colors]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend content={<CustomLegend />} /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Summary Stats */}

      {/* Action Items */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">Action Required</h4>
        <div className="space-y-1 text-xs text-yellow-700">
          <p>• {data.find(item => item.status === 'Critical')?.count.toLocaleString()} items need immediate restocking</p>
          <p>• {data.find(item => item.status === 'Low Stock')?.count.toLocaleString()} items require attention within 48 hours</p>
          <p>• Consider bulk ordering for frequently depleted categories</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryHealth;