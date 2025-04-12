
import { useState } from "react";
import axios from "axios";
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
import Inventory from "./Inventory";

export default function Items() {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupItems, setGroupItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for manual add item fields, matching backend itemController fields
  const [newItem, setNewItem] = useState({
    category_id: "",
    part_number: "",
    part_name: "",
    manufacturer: "",
    model_number: "",
    date_acquired: "",
    inventory_status: "In Stock",
    location: "",
    last_test_date: "",
    next_test_date: "",
    current_condition: "",
    additional_notes: "",
  });

  // State for bulk Excel file upload
  const [bulkFile, setBulkFile] = useState(null);

  // Update manual fields
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Excel file change
  const handleBulkFileChange = (e) => {
    setBulkFile(e.target.files[0]);
  };

  // Submit handler for the modal form
  const handleAddItem = async () => {
    try {
      // If an Excel file is provided, call the bulk import endpoint
      if (bulkFile) {
        const formData = new FormData();
        formData.append("file", bulkFile);
        // Replace with your bulk import endpoint URL if different
        const resBulk = await axios.post("http://localhost:5000/inventory/bulk", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Bulk Import Success:", resBulk.data.message);
      } else {
        // Otherwise, use manual form data
        const resManual = await axios.post("http://localhost:5000/inventory", newItem);
        console.log("Item Created:", resManual.data.message);
      }
      // Close the modal and optionally refresh your item list
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding item:", err.response?.data?.error || err.message);
    }
  };

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
          <span className="absolute -top-1 -right-1 bg-white text-indigo-600 text-xs px-1 rounded-full">
            New
          </span>
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
          {/* <div className="flex gap-4 mb-6">
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
          </div> */}

          {/* Stats */}
          {/* <div className="flex gap-8 mb-6 text-sm text-gray-500">
            <div>Folders: 0</div>
            <div>Items: 1</div>
            <div>Total Quantity: 1 unit</div>
            <div>Total Value: ₹4,500,000.00</div>
          </div> */}

          {/* Simplified Item Card */}
          {/* <div className="border border-gray-200 rounded-lg p-4 max-w-sm">
            <h3 className="font-semibold mb-2">Engine</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>1 unit</span>
              <span>₹4,500,000.00</span>
            </div>
          </div> */}

          {/* Pagination */}
          {/* <div className="flex items-center gap-2 mt-6">
            <span className="text-sm text-gray-500">Show:</span>
            <Select
              options={["10", "20", "50"]}
              defaultValue="20"
              onChange={(value) => console.log(`Show ${value} items per page`)}
            />
            <span className="text-sm text-gray-500">per page</span>
          </div> */}

          <Inventory/>


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
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {/* Part Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Part Name*</label>
                  <Input
                    name="part_name"
                    placeholder="Enter part name"
                    className="w-full"
                    value={newItem.part_name}
                    onChange={handleNewItemChange}
                  />
                </div>
                {/* Part Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Part Number*</label>
                  <Input
                    name="part_number"
                    placeholder="Enter part number"
                    className="w-full"
                    value={newItem.part_number}
                    onChange={handleNewItemChange}
                  />
                </div>
                {/* Manufacturer & Model Number */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                    <Input
                      name="manufacturer"
                      placeholder="Enter manufacturer"
                      className="w-full"
                      value={newItem.manufacturer}
                      onChange={handleNewItemChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model Number</label>
                    <Input
                      name="model_number"
                      placeholder="Enter model number"
                      className="w-full"
                      value={newItem.model_number}
                      onChange={handleNewItemChange}
                    />
                  </div>
                </div>
                {/* Category ID & Inventory Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category ID*</label>
                    <Input
                      name="category_id"
                      placeholder="Enter category ID"
                      className="w-full"
                      value={newItem.category_id}
                      onChange={handleNewItemChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Inventory Status*</label>
                    <Select
                      options={["In Stock", "Out of Stock"]}
                      defaultValue="In Stock"
                      onChange={(value) =>
                        setNewItem((prev) => ({ ...prev, inventory_status: value }))
                      }
                    />
                  </div>
                </div>
                {/* Dates */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Acquired*</label>
                    <Input
                      type="date"
                      name="date_acquired"
                      className="w-full"
                      value={newItem.date_acquired}
                      onChange={handleNewItemChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Test Date</label>
                    <Input
                      type="date"
                      name="last_test_date"
                      className="w-full"
                      value={newItem.last_test_date}
                      onChange={handleNewItemChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Next Test Date</label>
                    <Input
                      type="date"
                      name="next_test_date"
                      className="w-full"
                      value={newItem.next_test_date}
                      onChange={handleNewItemChange}
                    />
                  </div>
                </div>
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location*</label>
                  <Input
                    name="location"
                    placeholder="Enter location"
                    className="w-full"
                    value={newItem.location}
                    onChange={handleNewItemChange}
                  />
                </div>
                {/* Current Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Condition</label>
                  <Input
                    name="current_condition"
                    placeholder="Enter current condition"
                    className="w-full"
                    value={newItem.current_condition}
                    onChange={handleNewItemChange}
                  />
                </div>
                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <Input
                    name="additional_notes"
                    placeholder="Enter any additional notes"
                    className="w-full"
                    value={newItem.additional_notes}
                    onChange={handleNewItemChange}
                  />
                </div>
                {/* Excel Upload for Bulk Import */}
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <p className="text-gray-500">Upload Excel file for bulk import</p>
                  <Input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleBulkFileChange}
                    className="mt-2"
                  />
                </div>
              </div>
              {/* Modal Action Buttons */}
              <div className="flex justify-end mt-6 gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
