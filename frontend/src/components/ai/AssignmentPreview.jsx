import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Save, Edit, BookOpen, Target, CheckCircle2 } from 'lucide-react';

const AssignmentPreview = ({ assignment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">AI Generated Assignment</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{assignment.title}</h2>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1"><Target size={16} /> Difficulty: <span className="font-semibold text-gray-900">{assignment.estimatedDifficulty}</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 size={16} /> Total Marks: <span className="font-semibold text-gray-900">{assignment.totalMarks}</span></div>
          <div className="flex items-center gap-1"><Clock size={16} /> Est. Duration: <span className="font-semibold text-gray-900">2 Hours</span></div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-blue-500" /> Learning Objectives
          </h3>
          <ul className="space-y-2">
            {assignment.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <FileText size={20} className="text-primary" /> Problems Included
          </h3>
          <div className="space-y-3">
            {assignment.problems.map((prob, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-bold">Q{i + 1}</span>
                  <span className="font-semibold text-gray-800">{prob.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {prob.difficulty}
                  </span>
                  <span className="text-sm font-medium text-gray-500 w-16 text-right">{prob.marks} Marks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
        <button className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
          <Edit size={16} /> Modify Content
        </button>
        <button className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Save size={16} /> Save & Publish
        </button>
      </div>
    </motion.div>
  );
};

export default AssignmentPreview;
