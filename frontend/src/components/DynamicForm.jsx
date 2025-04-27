import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { formTemplates } from '../assets/data/formTemplates';

export default function DynamicForm({ selectedTemplate }) {
  const [formData, setFormData] = useState({});

  // Determine fields and title based on whether the template is custom
  const isCustom = selectedTemplate?.isCustom;
  const fields = isCustom
    ? selectedTemplate?.fields || []
    : formTemplates[selectedTemplate?.key]?.fields || [];

  const title = isCustom
    ? selectedTemplate?.title || 'Custom Form'
    : formTemplates[selectedTemplate?.key]?.title || 'Form';

  const handleChange = (e, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
  };

  const generateDoc = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            ...fields.map(field =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${field.label}: ${formData[field.name] || ''}`,
                    size: 24,
                  }),
                ],
              })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title.replace(/\s+/g, '_')}.docx`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateDoc();
  };

  if (!selectedTemplate) return null; // No template selected yet

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                required={field.required}
                className="border p-2 rounded w-full"
                onChange={(e) => handleChange(e, field.name)}
              >
                <option value="">Select</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                required={field.required}
                className="border p-2 rounded w-full"
                onChange={(e) => handleChange(e, field.name)}
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                className="border p-2 rounded w-full"
                onChange={(e) => handleChange(e, field.name)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Generate Word Document
        </button>
      </form>
    </div>
  );
}
