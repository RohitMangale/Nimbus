import React, { useState } from "react";
import { Lock, KeyRound, AlertCircle } from "lucide-react";
import axios from "axios";

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    setError(null);
  
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : null;
    const role = user ? JSON.parse(user).role_id : null;
    if (!token || !userId) {
      setError("Please login again.");
      setIsSaving(false);
      return;
    }
  
    const formData = {
      currentPassword: currentPassword,
      newPassword :newPassword,
      role: role,
    };
  
    try {
      const response = await axios.put(
        `http://localhost:5000/users/updatePassword/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong while updating password.";
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div className="h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8 overflow-scroll">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid gap-8 md:grid-cols-1 pb-8">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border mb-5 border-indigo-100">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
                <div className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Lock className="h-5 w-5" />
                  Change Password
                </div>
                <p className="text-indigo-100 text-sm mt-1">
                  Update your password to keep your account secure
                </p>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-6">
                {message && (
                  <div className="flex gap-2 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
                    <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="flex gap-2 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {showForgotPassword && (
                  <div className="flex gap-2 p-4 bg-indigo-50 border border-indigo-200 rounded-md text-indigo-800">
                    <AlertCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <p className="text-sm">
                      Password reset instructions have been sent to your email address.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="currentPassword"
                    className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <KeyRound className="h-4 w-4 text-indigo-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-4 w-4 text-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-indigo-50 px-6 py-4 flex justify-between">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                    isSaving ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none focus:underline transition-colors"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
