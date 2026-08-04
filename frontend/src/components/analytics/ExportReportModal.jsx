import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, FileSpreadsheet, FileJson } from 'lucide-react';

const ExportReportModal = ({ isOpen, onClose, reportName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Export Report</h3>
              <p className="text-sm text-gray-500 mt-1">{reportName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Select Export Format:</p>
            
            <button className="w-full p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-gray-900">PDF Document</h4>
                <p className="text-xs text-gray-500">Best for sharing and printing</p>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-red-500" />
            </button>

            <button className="w-full p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileSpreadsheet size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-gray-900">Excel Spreadsheet</h4>
                <p className="text-xs text-gray-500">Best for data analysis (.xlsx)</p>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-green-500" />
            </button>

            <button className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileJson size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-gray-900">CSV Data</h4>
                <p className="text-xs text-gray-500">Raw comma-separated values</p>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-blue-500" />
            </button>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExportReportModal;
