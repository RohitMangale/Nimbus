// UploadPage.jsx
import { useState } from "react";
import axios from "axios";
import { Input } from "./Input";
import { Select } from "./Select";
import { Button } from "./Button";

export default function UploadPage() {
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

  const [bulkFile, setBulkFile] = useState(null);

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleBulkFileChange = (e) => {
    setBulkFile(e.target.files[0]);
  };

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User token not found. Please login.");
        return;
      }

      if (bulkFile) {
        const formData = new FormData();
        formData.append("file", bulkFile);
        const resBulk = await axios.post("http://localhost:5000/inventory/bulk", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Bulk Import Success:", resBulk.data.message);
      } else {
        const resManual = await axios.post("http://localhost:5000/inventory", newItem, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Item Created:", resManual.data.message);
      }
    } catch (err) {
      console.error("Error adding item:", err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-10 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md ">
        {/* <h2 className="text-2xl font-semibold text-black mb-6">Add New Inventory Item</h2> */}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Part Name*</label>
              <Input name="part_name" value={newItem.part_name} onChange={handleNewItemChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Part Number*</label>
              <Input name="part_number" value={newItem.part_number} onChange={handleNewItemChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Manufacturer</label>
              <Input name="manufacturer" value={newItem.manufacturer} onChange={handleNewItemChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Model Number</label>
              <Input name="model_number" value={newItem.model_number} onChange={handleNewItemChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Category ID*</label>
              <Input name="category_id" value={newItem.category_id} onChange={handleNewItemChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Inventory Status*</label>
              <Select
                options={["In Stock", "Out of Stock"]}
                defaultValue="In Stock"
                onChange={(value) =>
                  setNewItem((prev) => ({ ...prev, inventory_status: value }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black">Date Acquired*</label>
              <Input type="date" name="date_acquired" value={newItem.date_acquired} onChange={handleNewItemChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Last Test Date</label>
              <Input type="date" name="last_test_date" value={newItem.last_test_date} onChange={handleNewItemChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Next Test Date</label>
              <Input type="date" name="next_test_date" value={newItem.next_test_date} onChange={handleNewItemChange} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Location*</label>
            <Input name="location" value={newItem.location} onChange={handleNewItemChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Current Condition</label>
            <Input name="current_condition" value={newItem.current_condition} onChange={handleNewItemChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Additional Notes</label>
            <Input name="additional_notes" value={newItem.additional_notes} onChange={handleNewItemChange} />
          </div>

          <div className="border-2 border-dashed border-indigo-300 rounded-md p-4 text-center">
            <p className="text-indigo-600">Upload Excel file for bulk import</p>
            <Input type="file" accept=".xlsx, .xls" onChange={handleBulkFileChange} className="mt-2 text-center" />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className=" cursor-pointer" onClick={handleAddItem}>Add Item</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
