import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, Edit, RefreshCw, Copy, Tag } from 'lucide-react';

const GeneratedProblemCard = ({ problem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="bg-gray-50 border-b border-gray-200 p-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">AI Generated</span>
            <h2 className="text-2xl font-bold text-gray-900">{problem.title}</h2>
          </div>
          <div className="flex items-center gap-2 mt-3">
            {problem.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-md">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors tooltip-trigger" title="Regenerate">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors tooltip-trigger" title="Copy Content">
            <Copy size={18} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Problem Statement</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.statement}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Input Format</h3>
            <p className="text-sm text-gray-600">{problem.inputFormat}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Output Format</h3>
            <p className="text-sm text-gray-600">{problem.outputFormat}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Constraints</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Sample Input</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm font-mono overflow-x-auto">
              {problem.sampleInput}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Sample Output</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm font-mono overflow-x-auto">
              {problem.sampleOutput}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
        <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Edit size={16} /> Edit Manually
        </button>
        <button className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Save size={16} /> Save to Problem Bank
        </button>
      </div>
    </motion.div>
  );
};

export default GeneratedProblemCard;
