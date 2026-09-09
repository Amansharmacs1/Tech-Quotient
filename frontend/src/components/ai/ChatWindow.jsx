import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Trash2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SuggestedPrompt from './SuggestedPrompt';
import { dummyChatHistory, suggestedPrompts } from '../../data/aiResponses';
import { sendAssistantMessage } from '../../services/aiService';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const newUserMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const aiResponse = await sendAssistantMessage(text, updatedMessages);
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">Teaching Assistant</h2>
            <p className="text-xs text-green-500 font-medium">Online & Ready</p>
          </div>
        </div>
        <button 
          onClick={handleClear}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Trash2 size={16} /> Clear Conversation
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <Sparkles size={48} className="text-primary/20 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Try asking</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {suggestedPrompts.map(prompt => (
                <SuggestedPrompt key={prompt} prompt={prompt} onClick={handleSend} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} content={msg.content} />
            ))}
            
            {isTyping && (
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Sparkles size={20} />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2 text-gray-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask TechQuotient AI anything..."
            className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm text-gray-700"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
