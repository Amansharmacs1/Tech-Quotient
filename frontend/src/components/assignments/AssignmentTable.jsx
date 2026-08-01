import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Eye, Trash2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssignmentTable = ({ assignments, onDeleteClick, onPublishClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-medium">
              <th className="py-4 px-6 font-medium">Assignment</th>
              <th className="py-4 px-6 font-medium">Course</th>
              <th className="py-4 px-6 font-medium">Problems</th>
              <th className="py-4 px-6 font-medium">Deadline</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium">Submissions</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => {
              const problemsCount = assignment.problemIds ? assignment.problemIds.length : 0;
              const isDraft = assignment.status === 'Draft';
              
              return (
                <motion.tr
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 font-medium text-secondary truncate max-w-[200px]" title={assignment.title}>
                    {assignment.title}
                  </td>
                  <td className="py-4 px-6 text-gray-500 truncate max-w-[150px]" title={assignment.course}>
                    {assignment.course}
                  </td>
                  <td className="py-4 px-6 text-gray-500">{problemsCount} Problems</td>
                  <td className="py-4 px-6 text-gray-500">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                      assignment.status === 'Published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{assignment.submissions}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-1">
                      {isDraft && (
                        <button
                          onClick={() => onPublishClick(assignment)}
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                          title="Publish Assignment"
                        >
                          <Send size={18} />
                        </button>
                      )}
                      <Link
                        to={`/assignments/${assignment.id}`}
                        className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/assignments/edit/${assignment.id}`}
                        className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                        title="Edit Assignment"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => onDeleteClick(assignment)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Delete Assignment"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentTable;
