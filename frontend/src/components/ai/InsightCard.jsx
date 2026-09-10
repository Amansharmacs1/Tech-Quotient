import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const InsightCard = ({ title, children, colorClass, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl border p-6 shadow-sm ${colorClass}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          {Icon && <Icon size={20} className="opacity-70" />}
          {title}
        </h3>
        <Sparkles size={16} className="text-primary opacity-50" />
      </div>
      <div>
        {children}
      </div>
    </motion.div>
  );
};

export default InsightCard;
