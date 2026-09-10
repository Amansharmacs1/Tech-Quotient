import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const ReportCard = ({ title, description, icon: Icon, colorClass, onExport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">Generated on demand</span>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-primary text-gray-700 hover:text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Download size={16} /> Export
        </button>
      </div>
    </motion.div>
  );
};

export default ReportCard;
