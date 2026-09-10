import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Clock } from 'lucide-react';

const PerformanceOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-primary" />
            <h3 className="font-bold text-gray-800">Overall Progress</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Students are performing exceptionally well this semester compared to historical data.</p>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 leading-none">A-</p>
            <p className="text-sm text-gray-500 font-medium mt-1">Class Average Grade</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-800">Monthly Growth</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Submission rates have increased steadily over the last 3 months.</p>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 leading-none">+15%</p>
            <p className="text-sm text-gray-500 font-medium mt-1">vs Last Semester</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-800">Time to Completion</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Average time students take to complete assignments.</p>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900 leading-none">2.4<span className="text-xl"> days</span></p>
            <p className="text-sm text-gray-500 font-medium mt-1">Fastest: 1.1 days (DSA)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PerformanceOverview;
