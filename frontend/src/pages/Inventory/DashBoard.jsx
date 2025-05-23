
import { useState } from "react";
import axios from "axios";
import {
  Package,
  User,
  Tags,
  ChevronRight,
  Store,
  Trash2,
  Settings,
  Bell,
  HelpCircle,  
  Wrench,
} from "lucide-react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import PasswordChangeForm from "../../components/PasswordChangeForm";
import UploadComponentsForm from "../../components/UploadComponentsForm";
import CreateRoles from "../../components/CreateRoles";
import Stock from "../../components/Stock";
import EmployeeManagement from "../../components/EmployeeManagement";
import Analytics from "../../components/Analytics";
import UserProfileForm from "../../components/UserProfileForm";
import Templates from "../../components/Templates";
import DynamicForm from "../../components/TemplateForm";
import CreateCustomTemplate from "../../components/CreateCustomTemplate";
import PartsMarketplace from "../../components/PartsMarketplace";
import Notifications from "../../components/Notifications";
import MyParts from "../../components/MyParts";
import PartsByOwner from "../PartsByOwner";
import Marketplace from "../Marketplace";

const SIDEBAR_TABS = [
  { key: "inventory", icon: Package, label: "Inventory", subtabs: [ "Upload Component"] },
  // { key: "inventory", icon: Package, label: "Inventory", subtabs: ["Analytics", "Stock", "Upload Component"] },
  { key: "profile", icon: User, label: "Profile", subtabs: ["Account", "Employee Management","Security"] },
  { key: "maintenenace", icon: Wrench, label: "Maintenenace", subtabs: ["Templates","Custom Template"] },
  { key: "market", icon: Store, label: "Market", subtabs: ["Parts Marketplace","My Parts"] },
  { key: "package", icon: Package, label: "Package", subtabs: ["Shipments", "Returns"] },
  { key: "another", icon: ChevronRight, label: "Another", subtabs: ["Custom1", "Custom2"] },
 // --- Lower Icons as real tabs ---
 { key: "notifications", icon: Bell, label: "Notifications", subtabs: ["View Notifications", "Notification Settings"] },
 { key: "help", icon: HelpCircle, label: "Help Center", subtabs: ["FAQs", "Contact Support"] },
 { key: "settings", icon: Settings, label: "Settings", subtabs: ["Account Settings", "System Settings"] },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupItems, setGroupItems] = useState(false);
  const user = localStorage.getItem('user');
  const firstname = user ? JSON.parse(user).firstname : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab,setTab] = useState("inventory")
  const [subtab, setSubtab] = useState("Upload Component");
  const currentTab = SIDEBAR_TABS.find((t) => t.key === tab);
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
      // Retrieve the token (assumes it's saved in localStorage after login)
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User token not found. Please login.");
        return;
      }

      // If an Excel file is provided, call the bulk import endpoint
      if (bulkFile) {
        const formData = new FormData();
        formData.append("file", bulkFile);
        console.log(formData)
        const resBulk = await axios.post(
          "http://localhost:5000/inventory/bulk",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Bulk Import Success:", resBulk.data.message);
      } else {
        // Otherwise, use manual form data
        const resManual = await axios.post(
          "http://localhost:5000/inventory",
          newItem,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Item Created:", resManual.data.message);
      }
      // Close the modal and optionally refresh your item list
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding item:", err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex h-[calc(100vh-70px)] bg-white">
    {/* Sidebar */}
    {/* Sidebar */}
<div className="w-16 bg-indigo-600 flex flex-col items-center py-4 text-white">
  {/* Top Tabs */}
  <nav className="flex flex-col gap-6 items-center flex-1">
    {SIDEBAR_TABS.slice(0, 6).map(({ key, icon: Icon }) => (
      <button
        key={key}
        onClick={() => {
          setTab(key);
          setSubtab(SIDEBAR_TABS.find(t => t.key === key)?.subtabs?.[0] || "");
        }}
        className={`p-2 transition-all duration-200 rounded-lg ${
          tab === key ? "bg-white text-indigo-600" : "hover:bg-indigo-700"
        }`}
      >
        <Icon className="w-5 h-5 cursor-pointer" />
      </button>
    ))}
  </nav>

  {/* Bottom Tabs */}
  <div className="flex flex-col gap-4 mt-auto">
    {SIDEBAR_TABS.slice(6).map(({ key, icon: Icon }) => (
      <button
        key={key}
        onClick={() => {
          setTab(key);
          setSubtab(SIDEBAR_TABS.find(t => t.key === key)?.subtabs?.[0] || "");
        }}
        className={`p-2 transition-all cursor-pointer duration-200 rounded-lg ${
          tab === key ? "bg-white text-indigo-600" : "hover:bg-indigo-700"
        }`}
      >
        <Icon className="w-5 h-5 cursor-pointer" />
      </button>
    ))}
  </div>
</div>


    {/* Left Panel */}
    <div className="w-68 border-r border-gray-200 p-4 flex flex-col">
  {/* Title + Border */}
  <div className="mb-2">
    <div className="text-sm text-gray-500 uppercase font-bold mb-2">{currentTab?.label}</div>
    <hr className="border-gray-300" />
  </div>

  {/* Subtabs */}
  <div className="flex flex-col gap-1 mt-4">
    {currentTab?.subtabs.map((sub, i) => (
      <button
        key={i}
        onClick={() => setSubtab(sub)}
        className={`w-full flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
          subtab === sub ? "bg-indigo-100 text-indigo-700 font-semibold" : "hover:bg-gray-100"
        }`}
      >
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span>{sub}</span>
      </button>
    ))}
  </div>
</div>

    {/* Main Content */}
    <div className="flex-1 overflow-hidden">
      <div className="p-6 max-h-screen h-full  overflow-scroll mb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{`${currentTab?.label} - ${subtab}`}</h1>

        </div>

        {/* Dummy content renderer */}
        {/* {tab === "inventory" && subtab === "Analytics" && <Analytics />}
        {tab === "inventory" && subtab === "Stock" && <Stock />} */}
        {tab === "inventory" && subtab === "Upload Component" && <UploadComponentsForm />}

        {!firstname && tab === "profile" && (
          <>
            {subtab === "Account" && <UserProfileForm />}
            {subtab === "Roles" && <CreateRoles />}
            {subtab === "Security" && <PasswordChangeForm />}
            {subtab === "Employee Management" && <EmployeeManagement />}
          </>
        )}


        

        {/* You can add additional conditions for each tab + subtab combo below */}
        {tab === "maintenenace" && subtab === "Templates" && <Templates />}
        {/* {tab === "maintenenace" && subtab === "Template Form" && <DynamicForm />} */}
        {tab === "maintenenace" && subtab === "Custom Template" && <CreateCustomTemplate />}
        {tab === "market" && subtab === "Parts Marketplace" && <Marketplace />}
        {tab === "market" && subtab === "My Parts" && <PartsByOwner />}
        {/* {tab === "maintenenace" && subtab === "Templates" && <Templates />} */}

        {tab === "package" && <div>Package Component Placeholder</div>}
        {tab === "another" && <div>Another Component Placeholder</div>}

        {tab === "notifications" && <Notifications/>}
{tab === "help" && <div>Help Center Content</div>}
{tab === "settings" && <div>Settings Page Content</div>}
      </div>
    </div>




  </div>
  );
}
