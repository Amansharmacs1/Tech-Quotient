import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const PromptPanel = ({ onGenerate, title, description, fields, defaultValues = {} }) => {
  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles size={24} className="text-primary" /> {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  value={formData[field.id] || ""}
                >
                  <option value="" disabled>Select {field.label}</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  required
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  value={formData[field.id] || ""}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
          >
            <Sparkles size={18} />
            Generate with AI
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptPanel;
