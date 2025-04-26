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
    const company_id = userData.company_id ?  userData.company_id  : userData.id;



  const handleSubmit = async (e) => {
    e.preventDefault();


    const templateData = {
      name: templateName,
      fields,
    };
    try{
        const response = await axios.post('http://localhost:5000/maintenance/template/create', {
            ...templateData,
            company_id: company_id,
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Template created successfully:', response.data);
    }
    catch (error) {
        console.error('Error creating template:', error.response?.data?.error || error.message);        
    }

    // Example: send to your Supabase backend API
    // await fetch('/api/create-template', { method: 'POST', body: JSON.stringify(templateData) });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-xl mt-6">
      <h1 className="text-2xl font-bold mb-4">Create New Form Template</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Template Name</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Add Fields</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Field Name"
              value={fieldInput.name}
              onChange={(e) => setFieldInput({ ...fieldInput, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Field Label"
              value={fieldInput.label}
              onChange={(e) => setFieldInput({ ...fieldInput, label: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <select
              value={fieldInput.type}
              onChange={(e) => setFieldInput({ ...fieldInput, type: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="textarea">Textarea</option>
              <option value="select">Select</option>
              <option value="file">File Upload</option>
            </select>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={fieldInput.required}
                onChange={(e) => setFieldInput({ ...fieldInput, required: e.target.checked })}
              />
              <label>Required</label>
            </div>
          </div>
          <button
            type="button"
            onClick={addField}
            className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Add Field
          </button>

          {/* Display added fields */}
          {fields.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Fields:</h3>
              <ul className="list-disc pl-6 space-y-1">
                {fields.map((f, idx) => (
                  <li key={idx}>
                    {f.label} ({f.type}) {f.required && <span className="text-red-500">*</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Template
        </button>
      </form>
    </div>
  );
}
