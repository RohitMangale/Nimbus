
import PartsCard from "./PartsCard";
const mockParts = [
  {
    name: "Turbine Blade Assembly",
    partNumber: "TB-2024-001",
    category: "Engine Components",
    ownedBy: "AeroCorp Industries",
    condition: "New",
    location: "Warehouse A",
    lastInspection: "2024-03-15"
  },
  {
    name: "Landing Gear Strut",
    partNumber: "LG-2024-045",
    category: "Landing Systems",
    ownedBy: "SkyTech Solutions",
    condition: "Used",
    location: "Hangar B",
    lastInspection: "2024-02-28"
  },
  {
    name: "Fuselage Panel",
    partNumber: "FP-2024-089",
    category: "Structural",
    ownedBy: "GlobalAir Maintenance",
    condition: "New",
    location: "Storage C",
    lastInspection: "2024-04-01"
  },
  {
    name: "Avionics Control Unit",
    partNumber: "ACU-2024-123",
    category: "Electronics",
    ownedBy: "AviationPlus Corp",
    condition: "Refurbished",
    location: "Lab D",
    lastInspection: "2024-04-15"
  },
  {
    name: "Hydraulic Pump",
    partNumber: "HP-2024-234",
    category: "Hydraulics",
    ownedBy: "TechOps Services",
    condition: "Used",
    location: "Warehouse E",
    lastInspection: "2024-03-30"
  }
];
const MySellingParts = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Aircraft Parts Inventory</h1>
          <p className="mt-2 text-gray-600">Manage and track aircraft parts inventory</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockParts.map((part) => (
        <PartsCard key={part.partNumber} {...part} />
      ))}
    </div>
      </main>
    </div>
  );
};

export default MySellingParts;
