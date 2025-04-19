import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from "lucide-react";

export default function Order() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all orders including their order ID, part number, customer details, and status.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
              New Order
            </button>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map(({ label, value, change, isPositive }, index) => (
            <div key={index} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-gray-900">{value}</div>
                <div className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium ${isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {isPositive ? <ArrowUpIcon className="-ml-1 mr-0.5 h-5 w-5 text-green-500" /> : <ArrowDownIcon className="-ml-1 mr-0.5 h-5 w-5 text-red-500" />}
                  {change}
                </div>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
          <p className="mt-2 text-sm text-gray-700">Overview of all orders and their current status.</p>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {tableHeaders.map((header, index) => (
                          <th key={index} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{header}</th>
                        ))}
                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.partNumber}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.customer}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.date}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${order.total.toLocaleString()}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
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

const stats = [
  { label: "Total Revenue", value: "$128,400", change: "12.5%", isPositive: true },
  { label: "Total Orders", value: "45", change: "8.2%", isPositive: true },
  { label: "Pending Orders", value: "12", change: "4.1%", isPositive: false },
];

const tableHeaders = ["Order ID", "Part Number", "Customer", "Status", "Date", "Total"];

const orders = [
  { id: "ORD-2024-001", partNumber: "AE-738-45X", customer: "Boeing Commercial", status: "Completed", date: "2024-02-20", total: 45000 },
  { id: "ORD-2024-002", partNumber: "AE-442-89B", customer: "Airbus Industries", status: "Processing", date: "2024-02-19", total: 32400 },
  { id: "ORD-2024-003", partNumber: "AE-556-12C", customer: "Lockheed Martin", status: "Pending", date: "2024-02-18", total: 28750 },
  { id: "ORD-2024-004", partNumber: "AE-901-34D", customer: "GE Aviation", status: "Completed", date: "2024-02-17", total: 22250 },
];

function getStatusStyles(status) {
  switch (status.toLowerCase()) {
    case "completed": return "bg-green-100 text-green-800";
    case "processing": return "bg-blue-100 text-blue-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
}
