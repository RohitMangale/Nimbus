import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {
  // Parse the stored user from localStorage
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const token = localStorage.getItem("token");
  const userId = storedUser ? storedUser.id : null;

  // Initialize state for user profile and password fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emp_id: "",
    job_post: "",
    role: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user profile from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId && token) {
          const res = await axios.get(`http://localhost:5000/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = res.data.data;
          // console.log(user)
          setFormData({
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            email: user.email || "",
            emp_id: user.emp_id || "",
            job_post: user.job_post || "",
            role: user.role || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  // Handlers for profile form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for password form inputs
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving profile changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User updated:", res.data.message);
      // Optionally display a toast or notification here
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/users/change-password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Password changed:", res.data.message);
      setPasswordData({ currentPassword: "", newPassword: "" });
      // Optionally display a success toast here
    } catch (error) {
      console.error("Error changing password:", error.response?.data || error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen border-b-gray-50 bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-normal text-gray-700 mb-4">User Profile</h1>
        <div className="h-px bg-gray-200 w-full mb-6"></div>

        {/* Personal Information Card */}
        <div className="bg-white rounded shadow-sm p-8 mb-6">
          <h2 className="text-xl font-normal text-gray-700 mb-6">Personal Information</h2>
          <form onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Employee Id</label>
                <input
                  type="text"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Job Function</label>
                <input
                  name="job_post"
                  value={formData.job_post}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-2"
                />
                 
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Role</label>
                
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded p-2"
                />
                
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white uppercase text-sm tracking-wider rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded shadow-sm p-8">
          <h2 className="text-xl font-normal text-gray-700 mb-6">Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full border border-gray-200 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full border border-gray-200 rounded p-2"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white uppercase text-sm tracking-wider rounded"
              >
                Save Changes
              </button>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
