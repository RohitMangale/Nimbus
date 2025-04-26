import { useState, useEffect } from 'react';
import { formTemplates } from '../assets/data/formTemplates';
import DynamicForm from './DynamicForm';
import axios from 'axios';

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customTemplates, setCustomTemplates] = useState([]);

  useEffect(() => {
    const fetchCustomTemplates = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/maintenance/templates', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomTemplates(response.data.data || []);
      } catch (error) {
        console.error('Error fetching custom templates:', error.response?.data?.error || error.message);
      }
    };

    fetchCustomTemplates();
  }, []);

  const handleSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Select a Template to Create</h1>

      {/* Static templates */}
      <h2 className="text-xl font-semibold mb-4">Default Templates</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-8">
        {Object.entries(formTemplates).map(([key, template]) => (
          <div
            key={key}
            onClick={() => handleSelect({ ...template, key, isCustom: false })}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedTemplate?.key === key && !selectedTemplate?.isCustom
                ? 'border-indigo-600 shadow-md'
                : 'hover:shadow-md hover:border-indigo-600'
            }`}
          >
            <h2 className="text-lg font-semibold">{template.title}</h2>
            <p className="text-gray-600 mt-1">{template.description}</p>
          </div>
        ))}
      </div>

      {/* Custom templates */}
      <h2 className="text-xl font-semibold mb-4">Your Custom Templates</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-8">
        {customTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect({ ...template, key: template.id, isCustom: true })}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedTemplate?.key === template.id && selectedTemplate?.isCustom
                ? 'border-indigo-600 shadow-md'
                : 'hover:shadow-md hover:border-indigo-600'
            }`}
          >
            <h2 className="text-lg font-semibold">{template.title}</h2>
          </div>
        ))}
      </div>

      {/* Show dynamic form */}
      {selectedTemplate && (
        <DynamicForm selectedTemplate={selectedTemplate} />
      )}
    </div>
  );
}
