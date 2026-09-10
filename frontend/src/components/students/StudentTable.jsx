import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const StudentTable = ({ students }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-medium">
              <th className="py-4 px-6 font-medium">Student Name</th>
              <th className="py-4 px-6 font-medium">Roll Number</th>
              <th className="py-4 px-6 font-medium">Course</th>
              <th className="py-4 px-6 font-medium">Completed Assignments</th>
              <th className="py-4 px-6 font-medium">Average Score</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
              >
                <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {getInitials(student.name)}
                  </div>
                  <div className="truncate max-w-[150px]" title={student.name}>
                    {student.name}
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-500 font-mono text-sm">{student.rollNumber}</td>
                <td className="py-4 px-6 text-gray-500 truncate max-w-[150px]" title={student.course}>
                  {student.course}
                </td>
                <td className="py-4 px-6 text-gray-500">{student.assignmentsCompleted}</td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-900">{student.averageScore}%</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                    student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/students/${student._id}`}
                      className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/performance`}
                      className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                      title="View Analytics"
                    >
                      <Activity size={18} />
                    </Link>
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

export default StudentTable;
