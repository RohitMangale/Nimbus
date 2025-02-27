import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from "lucide-react";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    inStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token"); // Make sure you've saved the token on login
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }
      const response = await axios.get("http://localhost:5000/inventory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = response.data.data;
      setInventoryItems(items);
  
      // Calculate stats from items
      const totalItems = items.length;
      const inStock = items.filter(
        (item) => item.inventory_status.toLowerCase() === "in stock"
      ).length;
      const outOfStock = totalItems - inStock;
      setStats({ totalItems, inStock, outOfStock });
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };
  

  // Define table headers for inventory items.
  const tableHeaders = [
    "Item ID",
    "Part Number",
    "Part Name",
    "Manufacturer",
    "Status",
    "Acquired Date",
    "Location",
  ];

  // Helper function to format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              Inventory
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all inventory items including their item ID, part number, name,
              manufacturer, status, and location.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
              New Inventory Item
            </button>
          </div>
        </div>

        {/* Inventory Stats */}
        <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Total Items
            </dt>
            <dd className="mt-1 flex items-baseline text-2xl font-semibold text-gray-900">
              {stats.totalItems}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              In Stock
            </dt>
            <dd className="mt-1 flex items-baseline text-2xl font-semibold text-gray-900">
              {stats.inStock}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Out of Stock
            </dt>
            <dd className="mt-1 flex items-baseline text-2xl font-semibold text-gray-900">
              {stats.outOfStock}
            </dd>
          </div>
        </dl>

        {/* Inventory Items Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Inventory Items
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Overview of all inventory items and their details.
          </p>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {tableHeaders.map((header, index) => (
                          <th
                            key={index}
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                      {inventoryItems.map((item) => (
                        <tr key={item.item_id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                            {item.item_id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.part_number}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.part_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(item.date_acquired)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.location}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {inventoryItems.length === 0 && (
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
          </div>
        </div>
      </div>
    </div>
  );
}
