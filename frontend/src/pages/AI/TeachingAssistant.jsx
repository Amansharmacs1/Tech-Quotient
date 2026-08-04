import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatWindow from '../../components/ai/ChatWindow';

const TeachingAssistant = () => {
  return (
    <div className="max-w-4xl mx-auto pb-6 h-full flex flex-col">
      <div className="mb-4 shrink-0">
        <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
          <ArrowLeft size={18} /> Back to AI Hub
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Chat Assistant</h1>
        <p className="text-gray-500 mt-1">Your personal AI co-pilot for classroom management and content generation.</p>
      </div>

      <div className="flex-1 min-h-[500px]">
        <ChatWindow />
      </div>
    </div>
  );
};

export default TeachingAssistant;
