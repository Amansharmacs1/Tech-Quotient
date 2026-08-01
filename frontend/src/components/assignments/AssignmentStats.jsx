import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, FileEdit, Users } from 'lucide-react';

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

const AssignmentStats = ({ assignments }) => {
  const total = assignments.length;
  const published = assignments.filter(a => a.status === 'Published').length;
  const drafts = assignments.filter(a => a.status === 'Draft').length;
  const activeSubmissions = assignments.reduce((sum, a) => sum + (a.submissions || 0), 0);

  const stats = [
    { label: 'Total Assignments', value: total, icon: FileText },
    { label: 'Published', value: published, icon: CheckCircle2 },
    { label: 'Drafts', value: drafts, icon: FileEdit },
    { label: 'Active Submissions', value: activeSubmissions, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} index={i} {...stat} />
      ))}
    </div>
  );
};

export default AssignmentStats;
