import React, { useState } from 'react';
import { formTemplates } from '../assets/data/formTemplates';

export default function DynamicForm() {
  const [selectedTemplate, setSelectedTemplate] = useState('maintenance');
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const handleChange = (e, fieldName, fieldType) => {
    if (fieldType === 'file') {
      setFiles(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => formPayload.append(key, value));
    Object.entries(files).forEach(([key, file]) => formPayload.append(key, file));
    
    console.log('Submitting form data...');
    for (let [key, value] of formPayload.entries()) {
      console.log(`${key}:`, value);
    }

    // send to backend with fetch/axios
  };

  const fields = formTemplates[selectedTemplate].fields;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create {formTemplates[selectedTemplate].title}</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Form Template</label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          {Object.keys(formTemplates).map(template => (
            <option key={template} value={template}>
              {formTemplates[template].title}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium">{field.label}</label>

            {field.type === 'select' ? (
              <select
                required={field.required}
                onChange={(e) => handleChange(e, field.name, 'select')}
                className="border p-2 rounded"
              >
                <option value="">Select</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                required={field.required}
                onChange={(e) => handleChange(e, field.name, 'textarea')}
                className="border p-2 rounded"
              />
            ) : field.type === 'file' ? (
              <input
                type="file"
                accept={field.accept || '*'}
                required={field.required}
                onChange={(e) => handleChange(e, field.name, 'file')}
                className="border p-2 rounded"
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                onChange={(e) => handleChange(e, field.name, field.type)}
                className="border p-2 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
