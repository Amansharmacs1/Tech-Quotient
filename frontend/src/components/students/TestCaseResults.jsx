import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, CheckSquare } from 'lucide-react';

const TestCaseResults = ({ testCases, score }) => {
  const passedCount = testCases.filter(tc => tc.status.includes('Passed')).length;
  const totalCount = testCases.length;
  const isPerfect = passedCount === totalCount;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <CheckSquare size={18} className="text-primary" /> Test Case Execution
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 ${
          isPerfect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPerfect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          Passed: {passedCount} / {totalCount}
        </div>
      </div>
      
      <div className="p-0">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-gray-500 font-medium">
              <th className="py-3 px-5">Test Case</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-right">Execution Time</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((tc, index) => {
              const isPassed = tc.status.includes('Passed');
              return (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5 font-medium text-gray-700">{tc.name}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center gap-1.5 font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                      {isPassed ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {tc.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right text-gray-500 font-mono">
                    {tc.time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
        <span className="text-gray-500 font-medium">Final Auto-Evaluated Score</span>
        <span className={`text-2xl font-bold ${score >= 50 ? 'text-green-600' : 'text-red-600'}`}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default TestCaseResults;
