import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Building2, Terminal, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'bg-green-100 text-green-700';
    case 'Medium': return 'bg-yellow-100 text-yellow-700';
    case 'Hard': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const ProblemCard = ({ problem, onDeleteClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-lg"
    >
      <div className="p-6 border-b border-gray-50 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">
                {problem.topic}
              </span>
            </div>
            <h3 className="text-lg font-bold text-secondary leading-tight mb-1 line-clamp-1" title={problem.title}>
              {problem.title}
            </h3>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
            problem.status === 'Published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {problem.status}
          </span>
        </div>

        <div className="space-y-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-400 shrink-0" />
            <span className="truncate" title={problem.course}>{problem.course}</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">{problem.language?.join(', ')}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50/50 p-4 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
          <Code2 size={16} className="text-primary" />
          {problem.submissions} Submissions
        </div>
        <div className="flex gap-2">
          <Link
            to={`/problems/${problem._id}`}
            className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={18} />
          </Link>
          <Link
            to={`/problems/edit/${problem._id}`}
            className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors"
            title="Edit Problem"
          >
            <Edit2 size={18} />
          </Link>
          <button
            onClick={() => onDeleteClick(problem)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Problem"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
