'use client';
import { useState } from 'react';

export default function DeliveryPartnerDashboard() {
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-1021',
      from: 'Warehouse – Sector 62',
      to: 'Dark Store – Rajouri',
      stockSize: '180 units',
      vehicle: 'DL01AB1234',
      expectedArrival: 'In 2 days, 4:00 PM',
      actualArrival: 'Pending',
      status: 'In Transit',
      driver: 'Rajesh Kumar',
      phone: '+91-9876543210',
      lastUpdate: '5 mins ago'
    },
    {
      id: 'DEL-1022',
      from: 'Dark Store – Connaught Place',
      to: 'Warehouse – Noida Phase 2',
      stockSize: '92 units',
      vehicle: 'DL04XY7890',
      expectedArrival: 'Yesterday, 11:30 AM',
      actualArrival: 'Yesterday, 11:35 AM',
      status: 'Delivered',
      driver: 'Amit Singh',
      phone: '+91-9123456789',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'DEL-1023',
      from: 'Warehouse – Kirti Nagar',
      to: 'Dark Store – Vasant Vihar',
      stockSize: '210 units',
      vehicle: 'HR29QW4532',
      expectedArrival: 'In 3 days, 9:00 AM',
      actualArrival: 'Pending',
      status: 'Scheduled',
      driver: 'Priya Sharma',
      phone: '+91-9988776655',
      lastUpdate: '15 mins ago'
    },
    {
      id: 'DEL-1024',
      from: 'Dark Store – Karol Bagh',
      to: 'Warehouse – Ghaziabad',
      stockSize: '156 units',
      vehicle: 'UP16CD9876',
      expectedArrival: 'Tomorrow, 2:30 PM',
      actualArrival: 'Pending',
      status: 'Delayed',
      driver: 'Mohammed Ali',
      phone: '+91-9555444333',
      lastUpdate: '30 mins ago'
    },
    {
      id: 'DEL-1025',
      from: 'Warehouse – Rohini',
      to: 'Dark Store – Dwarka',
      stockSize: '87 units',
      vehicle: 'DL02EF5432',
      expectedArrival: 'Today, 6:00 PM',
      actualArrival: 'Pending',
      status: 'Loading',
      driver: 'Suresh Yadav',
      phone: '+91-9777888999',
      lastUpdate: '10 mins ago'
    }
  ]);

  const updateStatus = (deliveryId: string, newStatus: string) => {
    setDeliveries(prev => 
      prev.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, status: newStatus, lastUpdate: 'Just now' }
          : delivery
      )
    );
  };

  const statusBadge = (status: string) => {
    let style = '';
    switch (status) {
      case 'Delivered':
        style = 'bg-green-100 text-green-700';
        break;
      case 'In Transit':
        style = 'bg-blue-100 text-blue-700';
        break;
      case 'Scheduled':
        style = 'bg-gray-100 text-gray-700';
        break;
      case 'Delayed':
        style = 'bg-red-100 text-red-700';
        break;
      case 'Loading':
        style = 'bg-purple-100 text-purple-700';
        break;
      default:
        style = 'bg-gray-100 text-gray-700';
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-80000">🚛 Pulse Logistics – Delivery Partner Hub</h1>
          <p className="text-gray-600 mt-2">Synchronizing delivery partners with your supply chain in real-time.</p>
        </header>

        <div className="space-y-6">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{delivery.id}</h3>
                  <p className="text-sm text-gray-500">{delivery.lastUpdate}</p>
                </div>
                {statusBadge(delivery.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-gray-500">From:</span>
                    <span className="ml-2 font-medium">{delivery.from}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">To:</span>
                    <span className="ml-2 font-medium">{delivery.to}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Stock:</span>
                    <span className="ml-2 font-medium">{delivery.stockSize}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-gray-500">Vehicle:</span>
                    <span className="ml-2 font-medium">{delivery.vehicle}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Driver:</span>
                    <span className="ml-2 font-medium">{delivery.driver}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Expected:</span>
                    <span className="ml-2 font-medium">{delivery.expectedArrival}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`tel:${delivery.phone}`, '_self')}
                  className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  📞 Call Driver
                </button>
                {delivery.status === 'In Transit' && (
                  <button
                    onClick={() => updateStatus(delivery.id, 'Delivered')}
                    className="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    Mark Delivered
                  </button>
                )}
                {delivery.status === 'Scheduled' && (
                  <button
                    onClick={() => updateStatus(delivery.id, 'In Transit')}
                    className="flex-1 px-4 py-2 bg-purple-50 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    Start Transit
                  </button>
                )}
                {delivery.status === 'Loading' && (
                  <button
                    onClick={() => updateStatus(delivery.id, 'In Transit')}
                    className="flex-1 px-4 py-2 bg-orange-50 text-orange-700 rounded-md text-sm font-medium hover:bg-orange-100 transition-colors"
                  >
                    Start Transit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="font-medium text-yellow-900">⚠️ Important</p>
          <p className="text-sm text-yellow-800 mt-1">
            Update delivery status within 30 minutes for accurate tracking.
          </p>
        </div>
      </div>
    </div>
  );
}