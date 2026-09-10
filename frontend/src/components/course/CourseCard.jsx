import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Code2, Edit2, Trash2, Eye, Building2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, onDeleteClick }) => {
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
            <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-2">
              {course.courseCode}
            </span>
            <h3 className="text-lg font-bold text-secondary leading-tight mb-1">{course.courseName}</h3>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
            course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {course.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-gray-400" />
            <span className="truncate" title={course.department}>{course.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span>Sem {course.semester}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-gray-400" />
            <span>{course.problems} Problems</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50/50 p-4 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
          <FileText size={16} className="text-primary" />
          {course.assignments} Assignments
        </div>
        <div className="flex gap-2">
          <Link
            to={`/courses/${course._id}`}
            className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={18} />
          </Link>
          <Link
            to={`/courses/edit/${course._id}`}
            className="p-2 text-gray-500 hover:text-primary hover:bg-accent rounded-lg transition-colors"
            title="Edit Course"
          >
            <Edit2 size={18} />
          </Link>
          <button
            onClick={() => onDeleteClick(course)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Course"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
