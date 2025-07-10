"use client";
const StoreMap = dynamic(() => import("../../components/StoreMap"), { ssr: false });
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { X, CheckCircle, Package, Space } from "lucide-react";
import RequestedItemsList from "@/components/RequestItemsList";
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
  { id: 1, name: "Milk", stock: 2, image: "/milk.png" },
  { id: 2, name: "Eggs", stock: 5, image: "/eggs.png" },
  { id: 3, name: "Bread", stock: 1, image: "/bread.png" },
  { id: 4, name: "Butter", stock: 0, image: "/butter.png" },
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

interface RequestSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: {
    product: string;
    option: string;
    storeId?: string;
    storeName?: string;
  } | null;
}

function RequestSuccessPopup({ isOpen, onClose, requestData }: RequestSuccessPopupProps) {
  if (!isOpen || !requestData) return null;

  const getRequestTypeText = () => {
    if (requestData.option === "specific" && requestData.storeName) {
      return `from ${requestData.storeName}`;
    }
    return "from any nearby store";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Request Successful!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <Package className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Item Requested:</span>
          </div>
          <div className="ml-7">
            <p className="text-green-700 font-semibold text-lg">{requestData.product}</p>
            <p className="text-green-600 text-sm">{getRequestTypeText()}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Request ID:</span> REQ-{Date.now().toString().slice(-6)}
          </p>
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Status:</span> Processing
          </p>
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Expected Response:</span> Within 30 minutes
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Requests
          </button>
        </div>
      </div>
    </div>
  );
}

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

  const handleSubmit = () => {
    if (!product.trim()) return;
    const selectedStore = stores.find(store => store.id === parseInt(storeId));
    onSubmit({ 
      product, 
      option, 
      storeId,
      storeName: selectedStore?.name 
    });
    setProduct("");
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Create Stock Request</h2>
      <div className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <div className="block mb-1 font-medium">Product</div>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <div className="block mb-1 font-medium">Request Option</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="option"
                value="specific"
                checked={option === "specific"}
                onChange={() => setOption("specific")}
                className="mr-1"
              />
              <span>Request from specific store</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="option"
                value="any"
                checked={option === "any"}
                onChange={() => setOption("any")}
                className="mr-1"
              />
              <span>Request from any nearby store</span>
            </div>
          </div>
        </div>
        {option === "specific" && (
          <div>
            <div className="block mb-1 font-medium">Select Store</div>
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
          onClick={handleSubmit}
          disabled={!product.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Request
        </button>
      </div>
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<any>(null);
  const [requestedItems, setRequestedItems] = useState<any[]>([]);
  const handleCreateRequest = (data: any) => {
    console.log("Request submitted:", data);
    setCurrentRequest(data);
    setShowSuccessPopup(true);
    setRequestedItems((prev) => [...prev, data]);

    setTimeout(() => {
      setSearching(false);
    }, 10000); // Simulated delay
  };
  const handleRequestAction = (id: number, action: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    // Optionally, show a toast or feedback
  };

  // const handleCreateRequest = (data: any) => {
  //   // Here you would send the request to backend
  //   console.log("Request submitted:", data);
  //   setCurrentRequest(data);
  //   setShowSuccessPopup(true);
  //   setSearching(true);
  //   setTimeout(() => {
  //     setSearching(false);
  //   }, 100000);
  // };

  const handleRecommendedRequest = (product: any) => {
    // Simulate requesting a recommended product
    const requestData = { product: product.name, option: "any", storeId: null, storeName: null };
    handleCreateRequest(requestData);
  };

  const closeSuccessPopup = () => {
    setSearching(true);
    setShowSuccessPopup(false);
    setCurrentRequest(null);
  };

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* <h1 className="text-3xl font-bold text-blue-800 mb-4">Request Stock</h1> */}
      {/* <div> */}
            <h1 className="text-4xl font-extrabold text-blue-800">Request Stock</h1>
            <br></br>
            {/* <p className="text-blue-800 text-sm">Intelligent insights for smarter retail decisions</p>
          </div> */}
      <SummaryCards summary={mockSummary} />
      <RecommendedProducts products={recommendedProducts} onRequest={handleRecommendedRequest} />
      <RequestsInbox requests={requests} onAction={handleRequestAction} />
      <CreateRequest stores={mockStores} onSubmit={handleCreateRequest} />
      
      {/* Success Popup */}
      <RequestSuccessPopup 
        isOpen={showSuccessPopup}
        onClose={closeSuccessPopup}
        requestData={currentRequest}
      />
      <RequestedItemsList items={requestedItems} />
      {showMap && <StoreMap searching={searching} />}
    </div>
  );
}