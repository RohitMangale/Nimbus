import React, { useState } from "react";

const initialEmployees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Manager",
    status: "suspended",
  },
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showForm, setShowForm] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.role.value;

    if (editingEmp) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmp.id ? { ...emp, name, email, role } : emp
        )
      );
    } else {
      const newEmp = {
        id: Date.now(),
        name,
        email,
        role,
        status: "active",
      };
      setEmployees((prev) => [...prev, newEmp]);
    }

    setShowForm(false);
    setEditingEmp(null);
    form.reset();
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: emp.status === "active" ? "suspended" : "active",
            }
          : emp
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-indigo-700">Employees</h1>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={() => {
            setEditingEmp(null);
            setShowForm(true);
          }}
        >
          Add New Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-indigo-100">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Suspended</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-indigo-50 cursor-pointer"
                onClick={() => {
                  setEditingEmp(emp);
                  setShowForm(true);
                }}
              >
                <td className="px-6 py-3">{emp.name}</td>
                <td className="px-6 py-3">{emp.email}</td>
                <td className="px-6 py-3">{emp.role}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      emp.status === "suspended"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {emp.status === "suspended" ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(emp.id);
                    }}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(emp.id);
                    }}
                    className={`text-sm px-2 py-1 rounded-md ${
                      emp.status === "active"
                        ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                        : "bg-green-200 text-green-800 hover:bg-green-300"
                    }`}
                  >
                    {emp.status === "active" ? "Suspend" : "Unsuspend"}
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4 text-sm">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
              onClick={() => {
                setShowForm(false);
                setEditingEmp(null);
              }}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">
              {editingEmp ? "Edit Employee" : "Add New Employee"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingEmp?.name || ""}
                  className="w-full px-4 py-2 border rounded-md border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingEmp?.email || ""}
                  className="w-full px-4 py-2 border rounded-md border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  defaultValue={editingEmp?.role || ""}
                  className="w-full px-4 py-2 border rounded-md border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {editingEmp && (
                <div className="text-sm text-gray-500">
                  Current Status:{" "}
                  <span
                    className={`font-medium ${
                      editingEmp.status === "active"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {editingEmp.status}
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {editingEmp ? "Save Changes" : "Add Employee"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-md hover:bg-indigo-50"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEmp(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
