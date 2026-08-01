import React from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConstraintsEditor = ({ constraints, onChange }) => {

  const addConstraint = () => {
    onChange([...constraints, '']);
  };

  const updateConstraint = (index, value) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;
    onChange(newConstraints);
  };

  const removeConstraint = (index) => {
    const newConstraints = constraints.filter((_, i) => i !== index);
    onChange(newConstraints);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Constraints</h3>
        <button
          type="button"
          onClick={addConstraint}
          className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 bg-accent px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={14} /> Add Constraint
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {constraints.map((constraint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={constraint}
                  onChange={(e) => updateConstraint(index, e.target.value)}
                  placeholder="e.g., 1 <= n <= 10^5"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => removeConstraint(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {constraints.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-4 italic">
            No constraints added. Click "Add Constraint" to begin.
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstraintsEditor;
