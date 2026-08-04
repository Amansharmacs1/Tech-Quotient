import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { analyticsStats } from '../../data/analytics';

const StatCard = ({ icon: Icon, label, value, index, trend, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
        <TrendingUp size={14} /> {trend}
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
  </motion.div>
);

const AnalyticsStats = () => {
  const stats = [
    { label: 'Total Students', value: analyticsStats.totalStudents, icon: Users, trend: '+5%', colorClass: 'bg-blue-100 text-blue-600' },
    { label: 'Average Score', value: `${analyticsStats.averageScore}%`, icon: Target, trend: '+2%', colorClass: 'bg-orange-100 text-orange-600' },
    { label: 'Assignments Completed', value: analyticsStats.assignmentsCompleted.toLocaleString(), icon: CheckCircle2, trend: '+12%', colorClass: 'bg-green-100 text-green-600' },
    { label: 'Submission Success', value: `${analyticsStats.submissionSuccessRate}%`, icon: TrendingUp, trend: '+4%', colorClass: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} index={i} {...stat} />
      ))}
    </div>
  );
};

export default AnalyticsStats;
