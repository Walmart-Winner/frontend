"use client";
import { Package } from "lucide-react";

export default function RequestedItemsList({ items }: { items: any[] }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">Your Requested Items</h2>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <Package className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{item.product}</p>
                <p className="text-xs text-gray-500 italic">Requesting...</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 text-sm bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-xl">📦</span>
          <p className="mt-2">No requested items yet</p>
        </div>
      )}
    </div>
  );
}
