"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Mock data
const mockRequests = [
  { id: 1, product: "Milk", from: "Warehouse A", status: "pending" },
  { id: 2, product: "Eggs", from: "Store B", status: "pending" },
];

const mockSummary = {
  total: 12,
  pending: 3,
  fulfilled: 7,
  outOfStock: 2,
};

const recommendedProducts = [
  { id: 1, name: "Milk", stock: 2, image: "/window.svg" },
  { id: 2, name: "Eggs", stock: 5, image: "/file.svg" },
  { id: 3, name: "Bread", stock: 1, image: "/globe.svg" },
  { id: 4, name: "Butter", stock: 0, image: "/vercel.svg" },
];

const centerLat = 28.47509000850516;
const centerLng = 77.0313186307907;

const mockStores = [
  { id: 1, name: "Your Store", lat: centerLat, lng: centerLng },
  { id: 2, name: "Store A", lat: centerLat + 0.005, lng: centerLng + 0.005 },
  { id: 3, name: "Store B", lat: centerLat - 0.004, lng: centerLng + 0.003 },
  { id: 4, name: "Store C", lat: centerLat + 0.003, lng: centerLng - 0.004 },
  { id: 5, name: "Store D", lat: centerLat - 0.006, lng: centerLng - 0.002 },
  { id: 6, name: "Store E", lat: centerLat + 0.007, lng: centerLng + 0.001 },
  { id: 7, name: "Store F", lat: centerLat - 0.002, lng: centerLng - 0.006 },
  { id: 8, name: "Store G", lat: centerLat + 0.004, lng: centerLng + 0.007 },
  { id: 9, name: "Store H", lat: centerLat - 0.005, lng: centerLng + 0.005 },
  { id: 10, name: "Store I", lat: centerLat + 0.006, lng: centerLng - 0.003 },
];

const StoreMap = dynamic(() => import("../../components/StoreMap"), { ssr: false });

function RequestsInbox({ requests, onAction }: { requests: any[]; onAction: (id: number, action: string) => void }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Incoming Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests at the moment.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req) => (
            <li key={req.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
              <span>
                <b>{req.product}</b> from <b>{req.from}</b>
              </span>
              <div className="space-x-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => onAction(req.id, "accept")}
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => onAction(req.id, "decline")}
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CreateRequest({ stores, onSubmit }: { stores: any[]; onSubmit: (data: any) => void }) {
  const [product, setProduct] = useState("");
  const [option, setOption] = useState("any");
  const [storeId, setStoreId] = useState(stores[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ product, option, storeId });
    setProduct("");
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Create Stock Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Request Option</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="option"
                value="specific"
                checked={option === "specific"}
                onChange={() => setOption("specific")}
                className="mr-1"
              />
              Request from specific store
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="option"
                value="any"
                checked={option === "any"}
                onChange={() => setOption("any")}
                className="mr-1"
              />
              Request from any nearby store
            </label>
          </div>
        </div>
        {option === "specific" && (
          <div>
            <label className="block mb-1 font-medium">Select Store</label>
            <select
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

function SummaryCards({ summary }: { summary: any }) {
  const cards = [
    { label: "Total Requests", value: summary.total, color: "bg-blue-100 text-blue-800" },
    { label: "Pending", value: summary.pending, color: "bg-yellow-100 text-yellow-800" },
    { label: "Fulfilled", value: summary.fulfilled, color: "bg-green-100 text-green-800" },
    { label: "Out of Stock", value: summary.outOfStock, color: "bg-red-100 text-red-800" },
  ];
  return (
    <div className="flex space-x-4 mb-8">
      {cards.map((card) => (
        <div key={card.label} className={`flex-1 p-4 rounded shadow ${card.color}`}>
          <div className="text-lg font-bold">{card.value}</div>
          <div className="text-sm">{card.label}</div>
        </div>
      ))}
    </div>
  );
}

function RecommendedProducts({ products, onRequest }: { products: any[], onRequest: (product: any) => void }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Recommended to Restock</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {products.map((prod) => (
          <div key={prod.id} className="min-w-[180px] bg-white rounded shadow p-4 flex flex-col items-center">
            <img src={prod.image} alt={prod.name} className="w-16 h-16 object-contain mb-2" />
            <div className="font-medium">{prod.name}</div>
            <div className="text-sm text-gray-500 mb-2">Stock: {prod.stock}</div>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => onRequest(prod)}
            >
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RequestStockPage() {
  const [requests, setRequests] = useState(mockRequests);
  const [searching, setSearching] = useState(false);

  const handleRequestAction = (id: number, action: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    // Optionally, show a toast or feedback
  };

  const handleCreateRequest = (data: any) => {
    // Here you would send the request to backend
    // For now, just log it
    console.log("Request submitted:", data);
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 100000);
  };

  const handleRecommendedRequest = (product: any) => {
    // Simulate requesting a recommended product
    handleCreateRequest({ product: product.name, option: "any", storeId: null });
  };

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Request Stock</h1>
      <SummaryCards summary={mockSummary} />
      <RecommendedProducts products={recommendedProducts} onRequest={handleRecommendedRequest} />
      <RequestsInbox requests={requests} onAction={handleRequestAction} />
      <CreateRequest stores={mockStores} onSubmit={handleCreateRequest} />
      {showMap && <StoreMap searching={searching} />}
    </div>
  );
}