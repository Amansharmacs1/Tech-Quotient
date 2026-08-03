import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Activity, Mail, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const StudentCard = ({ student }) => {
  const isActive = student.status === 'Active';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-lg"
    >
      <div className="p-6 border-b border-gray-50 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
              {getInitials(student.name)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-secondary leading-tight" title={student.name}>
                {student.name}
              </h3>
              <p className="text-sm text-gray-500 font-mono mt-0.5">{student.rollNo}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {student.status}
          </span>
        </div>

        <div className="space-y-3 text-sm text-gray-500 mt-6">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-gray-400 shrink-0" />
            <span className="truncate" title={student.course}>{student.course}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 font-medium text-gray-700">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              {student.averageScore}% Avg
            </div>
            <div className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
              {student.assignmentsCompleted} completed
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50/50 p-4 flex gap-2 border-t border-gray-100">
        <Link
          to={`/students/${student.id}`}
          className="flex-1 text-center py-2 bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/30 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Eye size={16} /> Profile
        </Link>
        <Link
          to={`/performance`}
          className="flex-1 text-center py-2 bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/30 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Activity size={16} /> Analytics
        </Link>
      </div>
    </motion.div>
  );
};

export default StudentCard;
