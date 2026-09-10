import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, FileText, Code2 } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-accent rounded-lg text-primary">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-secondary mt-1">{value}</h3>
      </div>
    </div>
  </motion.div>
);

const CourseStats = ({ courses }) => {
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'Active').length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);
  const totalAssignments = courses.reduce((sum, c) => sum + (c.assignments || 0), 0);

  const stats = [
    { label: 'Total Courses', value: totalCourses, icon: BookOpen },
    { label: 'Active Courses', value: activeCourses, icon: Code2 },
    { label: 'Total Students', value: totalStudents, icon: Users },
    { label: 'Assignments', value: totalAssignments, icon: FileText },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} index={i} {...stat} />
      ))}
    </div>
  );
};

export default CourseStats;
