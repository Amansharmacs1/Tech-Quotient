import React from 'react';
import { MessageSquare } from 'lucide-react';

const SuggestedPrompt = ({ prompt, onClick }) => {
  return (
    <button
      onClick={() => onClick(prompt)}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
    >
      <MessageSquare size={14} />
      {prompt}
    </button>
  );
};

export default SuggestedPrompt;
