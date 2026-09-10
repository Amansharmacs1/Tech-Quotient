import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, Edit, RefreshCw, Copy, Tag, AlertTriangle } from 'lucide-react';

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
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
              {problem.difficulty}
            </span>
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

      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-200 text-sm">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p><strong>AI-generated content may contain errors.</strong> Review before publishing.</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Problem Statement</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{problem.statement}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Input Format</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{problem.inputFormat}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Output Format</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{problem.outputFormat}</p>
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
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm font-mono overflow-x-auto whitespace-pre-wrap">
              {problem.sampleInput}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Sample Output</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-sm font-mono overflow-x-auto whitespace-pre-wrap">
              {problem.sampleOutput}
            </pre>
          </div>
        </div>

        {problem.explanation && (
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Explanation</h3>
            <p className="text-sm text-gray-600">{problem.explanation}</p>
          </div>
        )}

        {problem.expectedApproach && (
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 text-blue-800">Expected Approach</h3>
            <p className="text-sm text-gray-600">{problem.expectedApproach}</p>
            <div className="mt-3 flex items-center gap-4 text-xs font-bold text-blue-700">
              <span>Time Complexity: {problem.timeComplexity}</span>
              <span>Space Complexity: {problem.spaceComplexity}</span>
            </div>
          </div>
        )}

      </div>


    </motion.div>
  );
};

export default GeneratedProblemCard;
