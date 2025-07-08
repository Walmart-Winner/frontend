'use client';
import React from 'react';
import { AlertTriangle, Clock, Package } from 'lucide-react';

interface ExpiryItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  daysUntilExpiry: number;
  quantity: number;
  location: string;
}

interface ExpiryTableProps {
  data: ExpiryItem[];
}

const ExpiryTable: React.FC<ExpiryTableProps> = ({ data }) => {
  const getUrgencyColor = (days: number) => {
    if (days <= 7) return 'text-red-600 bg-red-50';
    if (days <= 14) return 'text-orange-600 bg-orange-50';
    if (days <= 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getUrgencyIcon = (days: number) => {
    if (days <= 7) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (days <= 14) return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    return <Clock className="h-4 w-4 text-yellow-600" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedData = [...data].sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days Left
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.expiryDate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getUrgencyIcon(item.daysUntilExpiry)}
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(item.daysUntilExpiry)}`}>
                      {item.daysUntilExpiry} days
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.quantity.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {item.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center">
          <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />
          <span className="text-gray-600">Critical (≤7 days)</span>
        </div>
        <div className="flex items-center">
          <AlertTriangle className="h-3 w-3 text-orange-600 mr-1" />
          <span className="text-gray-600">Urgent (≤14 days)</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 text-yellow-600 mr-1" />
          <span className="text-gray-600">Warning (≤30 days)</span>
        </div>
      </div>
    </div>
  );
};

export default ExpiryTable;