import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyProblemState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]"
    >
      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mb-6">
        <FileQuestion size={40} />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">No Coding Problems</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Create your first programming problem to start building assignments for your students.
      </p>
      <Link
        to="/problems/create"
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-primary/30 hover:-translate-y-0.5"
      >
        <Plus size={20} />
        Create Problem
      </Link>
    </motion.div>
  );
};

export default EmptyProblemState;
