import React, { useState } from "react";
import { User, Mail, Briefcase, Users, BadgeCheck } from "lucide-react";

const UserProfileForm = () => {
  const [isSaving, setIsSaving] = useState(false);

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
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-indigo-100">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <User className="h-5 w-5" />
            Personal Information
          </div>
          <p className="text-indigo-100 text-sm mt-1">
            Update your personal details and employment information
          </p>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="employeeId"
                className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
              >
                Employee ID
              </label>
              <div className="relative">
                <input
                  id="employeeId"
                  placeholder="EMP-12345"
                  className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <BadgeCheck className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="jobFunction"
                className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
              >
                Job Function
              </label>
              <div className="relative">
                <input
                  id="jobFunction"
                  placeholder="e.g. Software Engineer"
                  className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Briefcase className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
              >
                Role
              </label>
              <div className="relative">
                <input
                  id="role"
                  placeholder="e.g. Team Lead"
                  className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Users className="h-4 w-4 text-indigo-400" />
                </div>
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
            className="px-4 py-2 rounded-md font-medium text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
      </div>
      </div>  
      </div>
  );
}

export default UserProfileForm;
