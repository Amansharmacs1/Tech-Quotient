import React from 'react';
import { motion } from 'framer-motion';
import { BookX, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCourseState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]"
    >
      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary mb-6">
        <BookX size={40} />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">No Courses Found</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Create your first course to begin managing programming assignments, students, and performance analytics.
      </p>
      <Link
        to="/courses/create"
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-primary/30 hover:-translate-y-0.5"
      >
        <Plus size={20} />
        Create Course
      </Link>
    </motion.div>
  );
};

export default EmptyCourseState;
