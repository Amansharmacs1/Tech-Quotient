import React from 'react';
import { User, Sparkles } from 'lucide-react';

const ChatMessage = ({ role, content }) => {
  const isAI = role === 'ai';

  return (
    <div className={`flex gap-4 ${isAI ? '' : 'flex-row-reverse'} mb-6`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
        isAI ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
      }`}>
        {isAI ? <Sparkles size={20} /> : <User size={20} />}
      </div>
      
      <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
        isAI 
          ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm' 
          : 'bg-primary text-white rounded-tr-sm'
      }`}>
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
