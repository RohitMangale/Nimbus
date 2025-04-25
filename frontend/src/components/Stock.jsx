import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDownIcon } from "lucide-react";

export default function Stock() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const tableHeaders = [
    "Item ID",
    "Part Number",
    "Part Name",
    "Manufacturer",
    "Status",
    "Acquired Date",
    "Location",
  ];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredItems = inventoryItems.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.item_id.toLowerCase().includes(query) ||
      item.part_number.toLowerCase().includes(query) ||
      item.part_name.toLowerCase().includes(query) ||
      item.manufacturer.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.inventory_status.toLowerCase().includes(query) ||
      (query.includes("maintenance") && item.maintenance === "yes") ||
      (query.includes("scheduled") && item.status === "Scheduled") ||
      (query.includes("delivered") && item.status === "Being Delivered")
    );
  });

  // useEffect(() => {
  //   const fetchInventory = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("No token found");
  //         return;
  //       }

  //       const res = await axios.get("http://localhost:5000/inventory", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setInventoryItems(res.data.data || []);
  //     } catch (err) {
  //       console.error("Error fetching inventory:", err);
  //     }
  //   };

  //   fetchInventory();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Inventory Items</h1>
          <p className="text-sm text-gray-600 mt-1">
            Overview of all inventory items and their details.
          </p>
          <input
            type="text"
            placeholder="Search by name, part number, tags (e.g., maintenance yes, scheduled)"
            className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden shadow  sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-indigo-600">
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    {header}
                  </th>
                ))}
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredItems.map((item) => (
                <tr key={item.item_id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                    {item.item_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {item.part_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {item.part_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {item.manufacturer}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.inventory_status.toLowerCase() === "in stock"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.inventory_status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {formatDate(item.date_acquired)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {item.location}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={tableHeaders.length + 1}
                    className="px-3 py-4 text-center text-sm text-gray-500"
                  >
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
