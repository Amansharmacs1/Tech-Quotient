import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'bg-green-100 text-green-700';
    case 'Medium': return 'bg-yellow-100 text-yellow-700';
    case 'Hard': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const ProblemTable = ({ problems, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-medium">
              <th className="py-4 px-6 font-medium">Title</th>
              <th className="py-4 px-6 font-medium">Course</th>
              <th className="py-4 px-6 font-medium">Topic</th>
              <th className="py-4 px-6 font-medium">Difficulty</th>
              <th className="py-4 px-6 font-medium">Languages</th>
              <th className="py-4 px-6 font-medium">Submissions</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <motion.tr
                key={problem._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
              >
                <td className="py-4 px-6 font-medium text-secondary truncate max-w-xs" title={problem.title}>
                  {problem.title}
                </td>
                <td className="py-4 px-6 text-gray-500 truncate max-w-[150px]" title={problem.course}>{problem.course}</td>
                <td className="py-4 px-6 text-gray-500">{problem.topic}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500">
                  <div className="flex gap-1 flex-wrap w-32">
                    {problem.language?.map(lang => (
                      <span key={lang} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{lang}</span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-500">{problem.submissions}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                    problem.status === 'Published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {problem.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/problems/${problem._id}`}
                      className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/problems/edit/${problem._id}`}
                      className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                      title="Edit Problem"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => onDeleteClick(problem)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      title="Delete Problem"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTable;
