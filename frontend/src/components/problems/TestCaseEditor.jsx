import React from 'react';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestCaseEditor = ({ testCases, onChange }) => {

  const addTestCase = () => {
    const newId = testCases.length > 0 ? Math.max(...testCases.map(tc => tc.id)) + 1 : 1;
    onChange([...testCases, { id: newId, input: '', output: '', visibility: 'Sample' }]);
  };

  const updateTestCase = (id, field, value) => {
    const updated = testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc);
    onChange(updated);
  };

  const removeTestCase = (id) => {
    const updated = testCases.filter(tc => tc.id !== id);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Test Cases</h3>
        <button
          type="button"
          onClick={addTestCase}
          className="text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Add Test Case
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {testCases.map((tc, index) => (
            <motion.div
              key={tc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="font-semibold text-gray-700 flex items-center gap-2">
                  Test Case {index + 1}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-white rounded-md border border-gray-200 p-0.5 shadow-sm">
                    <button
                      type="button"
                      onClick={() => updateTestCase(tc.id, 'visibility', 'Sample')}
                      className={`px-3 py-1 text-xs font-medium rounded-sm flex items-center gap-1 transition-colors ${
                        tc.visibility === 'Sample' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Eye size={14} /> Sample
                    </button>
                    <button
                      type="button"
                      onClick={() => updateTestCase(tc.id, 'visibility', 'Hidden')}
                      className={`px-3 py-1 text-xs font-medium rounded-sm flex items-center gap-1 transition-colors ${
                        tc.visibility === 'Hidden' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <EyeOff size={14} /> Hidden
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTestCase(tc.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove Test Case"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Input</label>
                  <textarea
                    value={tc.input}
                    onChange={(e) => updateTestCase(tc.id, 'input', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm resize-y"
                    placeholder="e.g. 2 4&#10;1 2 3 4"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Expected Output</label>
                  <textarea
                    value={tc.output}
                    onChange={(e) => updateTestCase(tc.id, 'output', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm resize-y"
                    placeholder="e.g. 10"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {testCases.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No test cases configured for this problem.</p>
            <button
              type="button"
              onClick={addTestCase}
              className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-2 mx-auto bg-accent px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} /> Add First Test Case
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCaseEditor;
