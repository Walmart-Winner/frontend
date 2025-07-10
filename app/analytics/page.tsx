import MonthlyLineChart from '@/components/MonthlyLineChart';
import InventoryBarChart from '@/components/InventoryBarChart';
import InventoryHealth from '@/components/InventoryHealth';
import ExpiryTable from '@/components/ExpiryTable';
import SummaryCards from '@/components/SummaryCards';

// Data interfaces
interface MonthlyData {
  month: string;
  sent: number;
  received: number;
}

interface InventoryData {
  category: string;
  transferred: number;
  total: number;
}

interface HealthData {
  status: string;
  count: number;
  percentage: number;
}

interface ExpiryItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  daysUntilExpiry: number;
  quantity: number;
  location: string;
}

interface SummaryData {
  totalInventory: number;
  monthlyCost: number;
  itemsShipped: number;
  itemsReceived: number;
}

interface AnalyticsData {
  monthly: MonthlyData[];
  inventory: InventoryData[];
  health: HealthData[];
  expiry: ExpiryItem[];
  summary: SummaryData;
}

// This would be replaced with actual data fetching in a real app
async function getAnalyticsData(): Promise<AnalyticsData> {
  // Simulated data - in real app, this would come from your JSON files
  return {
    monthly: [
      { month: 'Jan', sent: 450000, received: 380000 },
      { month: 'Feb', sent: 520000, received: 420000 },
      { month: 'Mar', sent: 480000, received: 460000 },
      { month: 'Apr', sent: 610000, received: 490000 },
      { month: 'May', sent: 580000, received: 520000 },
      { month: 'Jun', sent: 650000, received: 580000 },
      { month: 'Jul', sent: 720000, received: 640000 },
      { month: 'Aug', sent: 680000, received: 620000 },
      { month: 'Sep', sent: 590000, received: 570000 },
      { month: 'Oct', sent: 630000, received: 590000 },
      { month: 'Nov', sent: 750000, received: 680000 },
      { month: 'Dec', sent: 820000, received: 760000 }
    ],
    inventory: [
      { category: 'Food & Beverages', transferred: 12500, total: 45000 },
      { category: 'Health & Wellness', transferred: 8200, total: 28000 },
      { category: 'Home Essentials', transferred: 6800, total: 32000 },
      { category: 'Electronics', transferred: 4200, total: 18000 },
      { category: 'Clothing', transferred: 5600, total: 25000 },
      { category: 'Auto & Tires', transferred: 3100, total: 15000 }
    ],
    health: [
      { status: 'In Stock', count: 18750, percentage: 75 },
      { status: 'Low Stock', count: 4375, percentage: 17.5 },
      { status: 'Critical', count: 1875, percentage: 7.5 }
    ],
    expiry: [
      {
        id: 'EXP001',
        name: 'Organic Milk 2% - 1 Gallon',
        category: 'Food & Beverages',
        expiryDate: '2025-07-15',
        daysUntilExpiry: 7,
        quantity: 45,
        location: 'DC-001-A12'
      },
      {
        id: 'EXP002',
        name: 'Fresh Strawberries - 16oz',
        category: 'Food & Beverages',
        expiryDate: '2025-07-12',
        daysUntilExpiry: 4,
        quantity: 28,
        location: 'DC-002-B08'
      },
      {
        id: 'EXP003',
        name: 'Whole Wheat Bread',
        category: 'Food & Beverages',
        expiryDate: '2025-07-20',
        daysUntilExpiry: 12,
        quantity: 67,
        location: 'DC-001-C15'
      },
      {
        id: 'EXP004',
        name: 'Greek Yogurt - Mixed Berry',
        category: 'Food & Beverages',
        expiryDate: '2025-07-18',
        daysUntilExpiry: 10,
        quantity: 89,
        location: 'DC-003-A05'
      },
      {
        id: 'EXP005',
        name: 'Vitamin D3 Supplements',
        category: 'Health & Wellness',
        expiryDate: '2025-08-05',
        daysUntilExpiry: 28,
        quantity: 156,
        location: 'DC-001-D22'
      }
    ],
    summary: {
      totalInventory: 163000,
      monthlyCost: 760000,
      itemsShipped: 28400,
      itemsReceived: 31200
    }
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-0">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Professional Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight mb-2">
              Pulse Metrics – Internal Access
            </h1>
            <p className="text-lg text-blue-700 font-medium">
              Live metrics on inventory transfers, fulfillment health, and cost activity
            </p>
            <p className="text-sm text-gray-500 mt-2">
              For use by authorized logistics and finance personnel only. All data reflects live operational throughput across regional DCs and store nodes.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-block bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-lg shadow">
              Fiscal Year: 2025
            </span>
            <span className="inline-block bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow">
              Last Sync: 5 min ago
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards data={data.summary} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/* Monthly Shipment Costs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Shipment Cost Trends
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-blue-700">Sent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-yellow-700">Received</span>
                </div>
              </div>
            </div>
            <MonthlyLineChart data={data.monthly} />
          </div>

          {/* Inventory by Category */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-yellow-100">
            <h2 className="text-xl font-bold text-blue-900 mb-6">
              Inventory Transfers by Category
            </h2>
            <InventoryBarChart data={data.inventory} />
          </div>
        </div>

        {/* Health and Expiry Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          {/* Inventory Health */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-6">
              Inventory Health Overview
            </h2>
            <InventoryHealth data={data.health} />
          </div>

          {/* Expiry Table */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-yellow-100">
            <h2 className="text-xl font-bold text-blue-900 mb-6">
              Products Approaching Expiry
            </h2>
            <ExpiryTable data={data.expiry} />
          </div>
        </div>

      </div>
    </div>
  );
}