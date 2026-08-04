import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUp } from 'lucide-react';

const EmptyAIState = ({ message = "No AI Results Yet" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
        <Sparkles size={40} className="text-primary" />
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -top-2 -right-2 text-primary"
        >
          <Sparkles size={20} />
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{message}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        Use the panel above to configure parameters and generate intelligent coding content using our AI assistant.
      </p>
      
      <div className="flex items-center gap-2 text-primary font-medium animate-pulse">
        <ArrowUp size={20} />
        Configure and generate above
      </div>
    </motion.div>
  );
};

export default EmptyAIState;
