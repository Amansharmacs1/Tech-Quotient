import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = ({ text = "Generating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-20 h-20 mb-6">
        {/* Core glowing dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-6 h-6 bg-primary rounded-full blur-[2px]"
        />
        
        {/* Orbiting rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-primary/20 rounded-full border-t-primary/80"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-2 border-blue-500/20 rounded-full border-b-blue-500/80"
        />
      </div>
      
      <motion.h3 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-lg font-bold text-gray-800 tracking-wide"
      >
        {text}
      </motion.h3>
      <p className="text-sm text-gray-400 mt-2">Powered by TechQuotient AI</p>
    </div>
  );
};

export default LoadingAnimation;
