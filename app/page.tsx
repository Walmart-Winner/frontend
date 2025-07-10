'use client';

import React from 'react';
import { Package, MapPin, BarChart3, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Request Inventory',
    description: 'Raise demand for stockouts from central or adjacent facilities.',
    icon: <Package className="w-6 h-6 text-blue-700" />,
    href: '/request'
  },
  {
    title: 'Nearby Stores',
    description: 'Locate nearby Walmart stores for resource sharing.',
    icon: <MapPin className="w-6 h-6 text-yellow-500" />,
    href: '/nearby'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track inventory movement and its financial reconciliation.',
    icon: <BarChart3 className="w-6 h-6 text-blue-700" />,
    href: '/analytics'
  }
];

const recentActivity = [
  {
    action: 'Requested 50 units of Product A',
    store: 'Central Warehouse',
    time: '2 min ago',
    status: 'success'
  },
  {
    action: 'Shipped 20 units to Store #123',
    store: 'Logistics Center',
    time: '10 min ago',
    status: 'success'
  },
  {
    action: 'Low stock alert for Product B',
    store: 'Store #456',
    time: '30 min ago',
    status: 'warning'
  }
];

export default function WalmartHomepage() {
  return (
    <div className="min-h-screen bg-gray-50 ml-5 mr-10 pb-16">
      <div className="px-8 py-12 max-w-7xl mx-auto">

        {/* Intro */}
        <section className="mb-10 text-left">
          {/* <h1 className="text-3xl font-bold text-blue-900 mb-2">Supply Chain Operations Center</h1> */}
          <h1 className="text-4xl font-extrabold text-blue-800">Pulse Dashboard</h1>
            <br></br>
          <p className="text-gray-700 max-w-3xl">
            Manage inter-store logistics, streamline warehouse coordination, and resolve stock imbalances
            with real-time insight into Walmart’s internal distribution network.
          </p>
        </section>

        {/* Feature Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm transition-all group cursor-pointer h-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-blue-50 rounded-md">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-12">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">

          {/* Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Real-Time Activity</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.store}</p>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div>
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-800">All Systems Operational</span>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inventory Sync</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Warehouse Comm</span>
                    <span className="font-semibold text-green-600">98.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Store Uptime</span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Snapshot */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Today’s Snapshot</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100">Orders Processed</span>
                  <span className="text-yellow-400 font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Items Shipped</span>
                  <span className="text-yellow-400 font-semibold">3,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Active Stock Requests</span>
                  <span className="text-yellow-400 font-semibold">27</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
