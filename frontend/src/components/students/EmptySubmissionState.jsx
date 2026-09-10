import React from 'react';
import { motion } from 'framer-motion';
import { FileCode2 } from 'lucide-react';

const EmptySubmissionState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[300px]"
    >
      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mb-6">
        <FileCode2 size={40} />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">No Submissions Found</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Published assignments will generate student submissions here. Try adjusting your search filters if you expect to see data.
      </p>
    </motion.div>
  );
};

export default EmptySubmissionState;
