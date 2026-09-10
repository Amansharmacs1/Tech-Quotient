import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Building2, Calendar, FileCode2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssignmentCard = ({ assignment, onDeleteClick, onPublishClick }) => {
  const problemsCount = assignment.problemIds ? assignment.problemIds.length : 0;
  const isDraft = assignment.status === 'Draft';

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
            <h3 className="text-lg font-bold text-secondary leading-tight mb-2 line-clamp-1" title={assignment.title}>
              {assignment.title}
            </h3>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
              assignment.status === 'Published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {assignment.status}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-400 shrink-0" />
            <span className="truncate" title={assignment.courseId?.courseName}>{assignment.courseId?.courseName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCode2 size={16} className="text-gray-400 shrink-0" />
            <span>{problemsCount} Problems Attached</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400 shrink-0" />
            <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50/50 p-4 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
          <div className="flex -space-x-2 mr-1">
            <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[10px] text-primary font-bold">{assignment.submissions > 99 ? '99+' : assignment.submissions}</div>
          </div>
          Submissions
        </div>
        <div className="flex gap-2">
          {isDraft && (
            <button
              onClick={() => onPublishClick(assignment)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Publish Assignment"
            >
              <Send size={18} />
            </button>
          )}
          <Link
            to={`/assignments/${assignment._id}`}
            className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={18} />
          </Link>
          <Link
            to={`/assignments/edit/${assignment._id}`}
            className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors"
            title="Edit Assignment"
          >
            <Edit2 size={18} />
          </Link>
          <button
            onClick={() => onDeleteClick(assignment)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Assignment"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AssignmentCard;
