import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseTable = ({ courses, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-medium">
              <th className="py-4 px-6 font-medium">Course Code</th>
              <th className="py-4 px-6 font-medium">Course Name</th>
              <th className="py-4 px-6 font-medium">Semester</th>
              <th className="py-4 px-6 font-medium">Students</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <motion.tr
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md text-sm">
                    {course.courseCode}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium text-secondary">{course.courseName}</td>
                <td className="py-4 px-6 text-gray-500">{course.semester}</td>
                <td className="py-4 px-6 text-gray-500">{course.students}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                    course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/courses/${course.id}`}
                      className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/courses/edit/${course.id}`}
                      className="p-2 text-gray-400 hover:text-primary rounded-lg transition-colors"
                      title="Edit Course"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => onDeleteClick(course)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                      title="Delete Course"
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

export default CourseTable;
