import axios from 'axios';
import React, { useState } from 'react';

export default function CreateCustomTemplate() {
  const [templateName, setTemplateName] = useState('');
  const [fields, setFields] = useState([]);
  const [fieldInput, setFieldInput] = useState({ name: '', label: '', type: 'text', required: false });

  const addField = () => {
    if (!fieldInput.name || !fieldInput.label) return;
    setFields([...fields, fieldInput]);
    setFieldInput({ name: '', label: '', type: 'text', required: false });
  };

  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;
  const company_id = userData.company_id ? userData.company_id : userData.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateData = {
      name: templateName,
      fields,
    };
    try {
      const response = await axios.post('http://localhost:5000/maintenance/template/create', {
        ...templateData,
        company_id: company_id,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Template created successfully:', response.data);
    } catch (error) {
      console.error('Error creating template:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl overfloe rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Create a New Form Template</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Template Name */}
        <div>
          <label className="block text-lg font-semibold mb-2">Template Name</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter template name"
            required
          />
        </div>

        {/* Add Fields Section */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Add Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Field Name"
              value={fieldInput.name}
              onChange={(e) => setFieldInput({ ...fieldInput, name: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Field Label"
              value={fieldInput.label}
              onChange={(e) => setFieldInput({ ...fieldInput, label: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              value={fieldInput.type}
              onChange={(e) => setFieldInput({ ...fieldInput, type: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="textarea">Textarea</option>
              <option value="select">Select</option>
              <option value="file">File Upload</option>
            </select>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={fieldInput.required}
                onChange={(e) => setFieldInput({ ...fieldInput, required: e.target.checked })}
                className="h-5 w-5 text-indigo-600"
              />
              <label className="text-lg">Required</label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={addField}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              ➕ Add Field
            </button>
          </div>

          {/* List Added Fields */}
          {fields.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Fields Added:</h3>
              <ul className="space-y-3">
                {fields.map((f, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span>{f.label} <span className="text-gray-500 text-sm">({f.type})</span> {f.required && <span className="text-red-500">*</span>}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-green-600 text-white text-lg px-8 py-3 rounded-full hover:bg-green-700 transition"
          >
            ✅ Save Template
          </button>
        </div>
      </form>
    </div>
  );
}
