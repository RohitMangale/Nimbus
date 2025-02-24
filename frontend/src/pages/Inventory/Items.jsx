"use client";

import { useState } from "react";
import {
  Search,
  Barcode,
  Grid,
  Package,
  Tags,
  ChevronRight,
  History,
  Trash2,
  Settings,
  Bell,
  HelpCircle,
  ArrowDownUp,
  LayoutGrid,
} from "lucide-react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Switch } from "../../components/Switch";
import { Select } from "../../components/Select";

export default function Items() {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupItems, setGroupItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-16 bg-indigo-600 flex flex-col items-center py-4 text-white">
        <div className="text-2xl font-bold mb-8">S</div>
        <nav className="flex flex-col gap-6 items-center flex-1">
          {[Grid, Package, Search, Tags, Package, ChevronRight].map((Icon, index) => (
            <button key={index} className="p-2 hover:bg-indigo-700 rounded-lg transition-colors">
              <Icon className="w-5 h-5" />
            </button>
          ))}
          <span className="absolute -top-1 -right-1 bg-white text-indigo-600 text-xs px-1 rounded-full">New</span>
        </nav>
        <div className="flex flex-col gap-4 mt-auto">
          {[Bell, HelpCircle, Settings].map((Icon, index) => (
            <button key={index} className="p-2 hover:bg-indigo-700 rounded-lg transition-colors">
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Left Panel */}
      <div className="w-64 border-r border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input placeholder="Search folders" className="pl-9 w-full" />
        </div>
        <div className="mt-4">
          <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Package className="w-5 h-5" /> All Items
          </button>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-200">
          {[History, Trash2].map((Icon, index) => (
            <button key={index} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">All Items</h1>
            <div className="flex gap-2">
              <Button variant="outline">Bulk Import</Button>
              <Button onClick={() => setIsModalOpen(true)}>ADD ITEM</Button>
              <Button>ADD FOLDER</Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search All Items"
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" className="absolute right-2 top-2 p-1">
                <Barcode className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Group Items</span>
              <Switch checked={groupItems} onChange={setGroupItems} />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              Updated At <ArrowDownUp className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-6 text-sm text-gray-500">
            <div>Folders: 0</div>
            <div>Items: 1</div>
            <div>Total Quantity: 1 unit</div>
            <div>Total Value: ₹4,500,000.00</div>
          </div>

          {/* Item Card */}
          <div className="border border-gray-200 rounded-lg p-4 max-w-sm">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5VmgGH86N7As0M9xSGcd3BH6MRjWSi.png"
                alt="Engine"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs">NEW</span>
            </div>
            <h3 className="font-semibold mb-2">Engine</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>1 unit</span>
              <span>₹4,500,000.00</span>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 mt-6">
            <span className="text-sm text-gray-500">Show:</span>
            <Select
              options={["10", "20", "50"]}
              defaultValue="20"
              onChange={(value) => console.log(`Show ${value} items per page`)}
            />
            <span className="text-sm text-gray-500">per page</span>
          </div>
        </div>

        {/* Add Item Modal */}
        {isModalOpen && (
          <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
        
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-semibold">Add Item</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Name*</label>
                  <Input placeholder="Enter item name" className="w-full" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity*</label>
                    <Input type="number" placeholder="Enter quantity" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit of Measure*</label>
                    <Select options={["unit", "kg", "liter", "piece"]} defaultValue="unit" className="w-full" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Level</label>
                    <Input type="number" placeholder="Enter minimum level" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <Input type="number" placeholder="Enter price" className="w-full" />
                  </div>
                </div>
                
                {/* Photo Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <p className="text-gray-500">Upload Photos (Max 8, 30 MB total)</p>
                </div>
                
                {/* Variants Toggle */}
                <div className="flex items-center gap-2">
                  <Switch />
                  <span className="text-sm font-medium text-gray-700">This item has variants</span>
                </div>
                
                {/* Folder Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Add to Folder</label>
                  <Select options={["All Items", "Category 1", "Category 2"]} defaultValue="All Items" className="w-full" />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end mt-6 gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button>Add Item</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}