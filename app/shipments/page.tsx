'use client';
import { useState } from 'react';

export default function DeliveryPartnerDashboard() {
  const [deliveries, setDeliveries] = useState([...initialDeliveries]);
  const [statusMessage, setStatusMessage] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = (deliveryId: string, newStatus: string) => {
    setUpdatingId(deliveryId);
    setStatusMessage('');

    setTimeout(() => {
      setDeliveries(prev =>
        prev.map(delivery =>
          delivery.id === deliveryId
            ? {
                ...delivery,
                status: newStatus,
                lastUpdate: 'Just now',
                timestamp: Date.now()
              }
            : delivery
        )
      );
      setStatusMessage(`✅ Status updated: ${deliveryId} is now ${newStatus}`);
      setUpdatingId(null);

      setTimeout(() => setStatusMessage(''), 2500); // Hide message after 2.5s
    }, 1500);
  };

  const statusBadge = (status: string) => {
    type DeliveryStatus = 'Delivered' | 'Out for Delivery' | 'Preparing';

    const styles: Record<DeliveryStatus, string> = {
      Delivered: 'bg-green-100 text-green-700',
      'Out for Delivery': 'bg-blue-100 text-blue-700',
      Preparing: 'bg-orange-100 text-orange-700'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as DeliveryStatus]}`}>
        {status}
      </span>
    );

  };

  const sortedDeliveries = [...deliveries].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-blue-800">Pulse Logistics – Delivery Dashboard</h1>
          <p className="text-gray-600 mt-2">Track live customer deliveries from your dark store.</p>
        </header>

        {statusMessage && (
          <div className="mb-4 p-3 text-green-800 bg-green-100 rounded-md border border-green-300 text-sm">
            {statusMessage}
          </div>
        )}

        <div className="space-y-6">
          {sortedDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className={`bg-white rounded-lg shadow-sm border p-6 transition-all duration-500 ease-in-out transform ${
                updatingId === delivery.id ? 'opacity-60 translate-y-1' : 'hover:shadow-md'
              }`}
            >
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
                    <span className="text-gray-500">To:</span>
                    <span className="ml-2 font-medium">{delivery.to}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Order:</span>
                    <span className="ml-2 font-medium">{delivery.orderSize}</span>
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
                {delivery.status === 'Preparing' && (
                  <button
                    disabled={updatingId === delivery.id}
                    onClick={() => updateStatus(delivery.id, 'Out for Delivery')}
                    className="flex-1 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-md text-sm font-medium hover:bg-yellow-100 transition-colors"
                  >
                    {updatingId === delivery.id ? 'Starting…' : 'Start Delivery'}
                  </button>
                )}
                {delivery.status === 'Out for Delivery' && (
                  <button
                    disabled={updatingId === delivery.id}
                    onClick={() => updateStatus(delivery.id, 'Delivered')}
                    className="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    {updatingId === delivery.id ? 'Completing…' : 'End Delivery'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

const initialDeliveries = [
  {
    id: 'ORD-8901',
    to: 'Customer – Rajouri Garden, Delhi',
    orderSize: '12 items',
    vehicle: 'DL01AB1234',
    expectedArrival: 'Today, 4:00 PM',
    actualArrival: 'Pending',
    status: 'Out for Delivery',
    driver: 'Rajesh Kumar',
    phone: '+91-9876543210',
    lastUpdate: '5 mins ago',
    timestamp: Date.now() - 5 * 60 * 1000
  },
  {
    id: 'ORD-8902',
    to: 'Customer – Connaught Place, Delhi',
    orderSize: '5 items',
    vehicle: 'DL04XY7890',
    expectedArrival: 'Yesterday, 11:30 AM',
    actualArrival: 'Yesterday, 11:35 AM',
    status: 'Delivered',
    driver: 'Amit Singh',
    phone: '+91-9123456789',
    lastUpdate: '2 hours ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000
  },
  {
    id: 'ORD-8903',
    to: 'Customer – Vasant Vihar, Delhi',
    orderSize: '8 items',
    vehicle: 'HR29QW4532',
    expectedArrival: 'Today, 6:30 PM',
    actualArrival: 'Pending',
    status: 'Preparing',
    driver: 'Priya Sharma',
    phone: '+91-9988776655',
    lastUpdate: '15 mins ago',
    timestamp: Date.now() - 15 * 60 * 1000
  },
  {
    id: 'ORD-8904',
    to: 'Customer – Karol Bagh, Delhi',
    orderSize: '10 items',
    vehicle: 'UP16CD9876',
    expectedArrival: 'Today, 5:45 PM',
    actualArrival: 'Pending',
    status: 'Out for Delivery',
    driver: 'Mohammed Ali',
    phone: '+91-9555444333',
    lastUpdate: '30 mins ago',
    timestamp: Date.now() - 30 * 60 * 1000
  },
  {
    id: 'ORD-8905',
    to: 'Customer – Dwarka Sector 7, Delhi',
    orderSize: '15 items',
    vehicle: 'DL02EF5432',
    expectedArrival: 'Today, 7:15 PM',
    actualArrival: 'Pending',
    status: 'Preparing',
    driver: 'Suresh Yadav',
    phone: '+91-9777888999',
    lastUpdate: '10 mins ago',
    timestamp: Date.now() - 10 * 60 * 1000
  }
];
