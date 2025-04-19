

import React, { useState } from "react";
import { ShieldCheck, BadgePlus, Settings2, Users } from "lucide-react";

const CreateRoles = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    permissions: {
      canView: false,
      canEdit: false,
      canDelete: false,
      canCreate: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.permissions) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <BadgePlus className="h-5 w-5" />
            Create Employee Role
          </div>
          <p className="text-indigo-100 text-sm mt-1">
            Define roles and assign permission levels for employees.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="roleName"
              className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
            >
              Role Name
            </label>
            <div className="relative">
              <input
                id="roleName"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                placeholder="e.g. Admin, Manager, Viewer"
                className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Users className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium flex items-center gap-1.5 text-gray-700"
            >
              Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe this role's responsibilities"
                rows={3}
                className="w-full px-4 py-2 pl-10 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <div className="absolute top-3 left-3 pointer-events-none">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5 text-gray-700">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "View", name: "canView" },
                { label: "Edit", name: "canEdit" },
                { label: "Delete", name: "canDelete" },
                { label: "Create", name: "canCreate" },
              ].map((perm) => (
                <label
                  key={perm.name}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    name={perm.name}
                    checked={formData.permissions[perm.name]}
                    onChange={handleChange}
                    className="rounded border-indigo-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                  />
                  {perm.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-indigo-50 px-6 py-4 flex justify-between">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
              isSaving ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isSaving}
          >
            {isSaving ? "Creating..." : "Create Role"}
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
};

export default CreateRoles;

