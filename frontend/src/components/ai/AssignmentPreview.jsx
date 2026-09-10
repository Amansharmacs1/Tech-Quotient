import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Save, Edit, BookOpen, Target, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

const AssignmentPreview = ({ assignment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">AI Generated Assignment</span>
            <span className="text-sm font-medium text-gray-500">{assignment.course}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{assignment.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1"><Target size={16} /> Estimated Difficulty: <span className="font-semibold text-gray-900">{assignment.estimatedDifficulty}</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 size={16} /> Maximum Marks: <span className="font-semibold text-gray-900">{assignment.totalMarks}</span></div>
          <div className="flex items-center gap-1"><Clock size={16} /> Duration: <span className="font-semibold text-gray-900">{assignment.duration} Minutes</span></div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-200 text-sm">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p><strong>AI-generated content may contain errors.</strong> Review before publishing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-blue-500" /> Learning Objectives
            </h3>
            <ul className="space-y-2">
              {assignment.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Lightbulb size={20} className="text-orange-500" /> Skills Evaluated
            </h3>
            <div className="flex flex-wrap gap-2">
              {assignment.skillsEvaluated.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-700 text-sm font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <FileText size={20} className="text-primary" /> Problems Included ({assignment.problems.length})
          </h3>
          <div className="space-y-3">
            {assignment.problems.map((prob, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-bold">Q{i + 1}</span>
                  <div>
                    <span className="font-semibold text-gray-800 block">{prob.title}</span>
                    <span className="text-xs font-medium text-gray-500">{prob.topic}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
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


    </motion.div>
  );
};

export default AssignmentPreview;
