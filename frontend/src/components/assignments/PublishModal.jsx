import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

const PublishModal = ({ isOpen, onClose, onConfirm, assignmentTitle }) => {
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
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Publish Assignment?</h3>
            <p className="text-gray-900 font-semibold mb-2 break-words">"{assignmentTitle}"</p>
            <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
              Students will be able to access this assignment and begin making submissions immediately. Make sure you have attached all necessary coding problems.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200"
              >
                <Send size={18} />
                Publish
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PublishModal;
