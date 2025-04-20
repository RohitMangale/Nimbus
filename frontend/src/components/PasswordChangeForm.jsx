import React, { useState } from "react";
import { Lock, KeyRound, AlertCircle } from "lucide-react";

const PasswordChangeForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
  };

  return (
    <div className="h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8 overflow-scroll">
    <div className="max-w-4xl mx-auto space-y-8">
      

      <div className="grid gap-8 md:grid-cols-1 pb-8">
      <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border  mb-5 border-indigo-100">
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
}

export default PasswordChangeForm;
