import React from 'react';
import { motion } from 'framer-motion';
import { Code2, CheckCircle2, FileEdit, TrendingUp } from 'lucide-react';

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

const ProblemStats = ({ problems }) => {
  const totalProblems = problems.length;
  const publishedProblems = problems.filter(p => p.status === 'Published').length;
  const draftProblems = problems.filter(p => p.status === 'Draft').length;
  const totalSubmissions = problems.reduce((sum, p) => sum + (p.submissions || 0), 0);

  const stats = [
    { label: 'Total Problems', value: totalProblems, icon: Code2 },
    { label: 'Published Problems', value: publishedProblems, icon: CheckCircle2 },
    { label: 'Draft Problems', value: draftProblems, icon: FileEdit },
    { label: 'Total Submissions', value: totalSubmissions, icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} index={i} {...stat} />
      ))}
    </div>
  );
};

export default ProblemStats;
