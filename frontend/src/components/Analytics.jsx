import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";
import { Card, CardContent } from "./Card";

const COLORS = ["#4ade80", "#f97316", "#60a5fa"];

export default function Analytics() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    inStock: 0,
    outOfStock: 0,
  });
  const [categoryCount, setCategoryCount] = useState([]);
  const [acquisitionTrends, setAcquisitionTrends] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }
      const response = await axios.get("http://localhost:5000/inventory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = response.data.data;
      setInventoryItems(items);

      // Stats
      const totalItems = items.length;
      const inStock = items.filter(
        (item) => item.inventory_status.toLowerCase() === "in stock"
      ).length;
      const outOfStock = totalItems - inStock;
      setStats({ totalItems, inStock, outOfStock });

      // Category Count
      const countMap = {};
      items.forEach((item) => {
        const category = item.category_name || "Uncategorized";
        countMap[category] = (countMap[category] || 0) + 1;
      });
      setCategoryCount(
        Object.entries(countMap).map(([name, count]) => ({ name, count }))
      );

      // Acquisition Trend
      const trendsMap = {};
      items.forEach((item) => {
        const date = new Date(item.acquired_date).toISOString().split("T")[0];
        trendsMap[date] = (trendsMap[date] || 0) + 1;
      });
      const trendData = Object.entries(trendsMap)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setAcquisitionTrends(trendData);

    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const pieData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Out of Stock", value: stats.outOfStock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-bold">{stats.totalItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">In Stock</p>
            <p className="text-2xl font-bold text-green-500">{stats.inStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Out of Stock</p>
            <p className="text-2xl font-bold text-red-500">{stats.outOfStock}</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Stock Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Items by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryCount}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="md:col-span-2">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Acquisition Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={acquisitionTrends}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4ade80"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
