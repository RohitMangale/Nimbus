import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ Make sure axios is imported
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Oval } from "react-loader-spinner";

// const initialEmployees = [
//   {
//     id: 1,
//     firstname: "Alice",
//     lastname: "Johnson",
//     email: "alice@example.com",
//     employeeid: "EMP001",
//     jobfunction: "Operations",
//     role: "Admin",
//     status: "active",
//   },
//   {
//     id: 2,
//     firstname: "Bob",
//     lastname: "Smith",
//     email: "bob@example.com",
//     employeeid: "EMP002",
//     jobfunction: "Sales",
//     role: "Manager",
//     status: "suspended",
//   },
// ];
const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    employeeid: "",
    jobfunction: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const userId = user ? JSON.parse(user).id : null; // Get userId from localStorage
  const company_id = user ? JSON.parse(user).id : null; // Get companyId from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      ...form,
      company_id,
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/users/createEmployee/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      toast.success(res.data.message || "Employee created successfully!");

      if (res.data.message === "Employee created successfully!") {
        setForm({
          firstname: "",
          lastname: "",
          email: "",
          employeeid: "",
          jobfunction: "",
          role: "",
        });
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error:", err.response);
      setMessage(err.response?.data?.error || "Employee Creation failed");
      toast.error(err.response?.data?.error || "Employee Creation failed");
    } finally {
      setLoading(false);
    }
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

    useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get("http://localhost:5000/users/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(res.data.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-indigo-700">Employees</h1>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={() => {
            setEditingEmp(null);
            setForm({
              firstname: "",
              lastname: "",
              email: "",
              employeeid: "",
              jobfunction: "",
              role: "",
            });
            setShowForm(true);
          }}
        >
          Add New Employee
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow border border-indigo-100">
        <table className="min-w-full bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Emp ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Job Function
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Suspended
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-indigo-50">
                <td className="px-6 py-3">{`${emp.firstname} ${emp.lastname}`}</td>
                <td className="px-6 py-3">{emp.email}</td>
                <td className="px-6 py-3">{emp.employeeid}</td>
                <td className="px-6 py-3">{emp.jobfunction}</td>
                <td className="px-6 py-3">{emp.role_id}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      emp.suspended === "suspended"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {emp.suspended === "true" ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditingEmp(emp);
                      setForm(emp); // Preload form
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleStatus(emp.id)}
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
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full px-4 py-2 border rounded-md border-indigo-200"
              />
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 border rounded-md border-indigo-200"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-2 border rounded-md border-indigo-200"
              />
              <input
                type="text"
                name="employeeid"
                value={form.employeeid}
                onChange={handleChange}
                placeholder="Employee ID"
                required
                className="w-full px-4 py-2 border rounded-md border-indigo-200"
              />
              <input
                type="text"
                name="jobfunction"
                value={form.jobfunction}
                onChange={handleChange}
                placeholder="Job Function"
                required
                className="w-full px-4 py-2 border rounded-md border-indigo-200"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md border-indigo-200"
                required
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Admin</option>
                <option value="walletmanager">WalletManager</option>
                <option value="parts engineer">Parts Engineer</option>
                <option value="manager">Manager</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                  ) : editingEmp ? (
                    "Save Changes"
                  ) : (
                    "Add Employee"
                  )}
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
