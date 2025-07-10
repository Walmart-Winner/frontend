'use client';
import React from 'react';
import { Package, DollarSign, TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

interface SummaryData {
  totalInventory: number;
  monthlyCost: number;
  itemsShipped: number;
  itemsReceived: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const cards = [
    {
      title: 'Total Inventory',
      value: data.totalInventory.toLocaleString('en-US'),
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(data.monthlyCost / 1000).toFixed(0)}K`,
      change: '-1.2%',
      changeType: 'negative' as const,
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Items Shipped',
      value: data.itemsShipped.toLocaleString(),
      change: '+5.7%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Items Received',
      value: data.itemsReceived.toLocaleString(),
      change: '+8.1%',
      changeType: 'positive' as const,
      icon: TrendingDown,
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-700';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-700';
      case 'green':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <span className="text-2xl font-bold text-gray-900">{card.value}</span>
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-medium ${
                    card.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${getColorClasses(card.color)}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;