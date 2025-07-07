'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Home,
  Package,
  MapPin,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Bot
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Request Stock', href: '/request', icon: <Package className="w-5 h-5" /> },
    { name: 'Nearby Stores', href: '/nearby', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Stock with AI', href: '/aiModel', icon: <Bot className="w-5 h-5" /> }
  ];

  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } h-screen fixed top-0 left-0 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg transition-all duration-300 z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-blue-800 font-bold text-lg">W</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">Walmart SCM</h2>
              <p className="text-yellow-300 text-xs font-medium">SmartMESH</p>
            </div>
          )}
        </div>
        <button
          className="text-white p-1 hover:bg-blue-700 rounded-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-2">
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700/50 transition-all group"
          >
            <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
              <div className="text-white group-hover:text-blue-800">{item.icon}</div>
            </div>
            {!collapsed && (
              <span className="font-medium group-hover:text-yellow-300">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500/30">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-sm text-blue-200">Walmart Sparkathon Exclusive</span>
          </div>
        </div>
      )}
    </div>
  );
}
