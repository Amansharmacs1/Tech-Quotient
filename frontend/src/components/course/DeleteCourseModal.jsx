import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Trash2 } from 'lucide-react';

const DeleteCourseModal = ({ isOpen, onClose, onConfirm, courseName }) => {
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
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Course</h3>
            <p className="text-gray-500 mb-1">Are you sure you want to delete</p>
            <p className="text-gray-900 font-semibold mb-6 break-words">"{courseName}"?</p>
            <p className="text-sm text-red-500 mb-6 bg-red-50 p-3 rounded-lg border border-red-100">
              This action cannot be undone and will remove all associated assignments and student records.
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
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm shadow-red-200"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteCourseModal;
