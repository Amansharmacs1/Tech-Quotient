import React from 'react';
import { Copy, Terminal, Code2 } from 'lucide-react';

const CodeViewer = ({ code, language }) => {
  const lines = code.split('\n');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    // In a real app, add a toast notification here
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-sm border border-gray-800 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-gray-700">
        <div className="flex items-center gap-2 text-gray-300">
          <Code2 size={16} />
          <span className="font-semibold text-xs tracking-wider uppercase">{language}</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 p-1 rounded-md hover:bg-white/10 text-xs"
        >
          <Copy size={14} /> Copy
        </button>
      </div>
      
      {/* Code Area */}
      <div className="flex overflow-auto max-h-[500px]">
        {/* Line Numbers */}
        <div className="flex flex-col text-right px-4 py-4 bg-[#252526] text-gray-500 select-none border-r border-gray-700 min-h-full">
          {lines.map((_, i) => (
            <span key={i} className="leading-relaxed">{i + 1}</span>
          ))}
        </div>
        
        {/* Code Content */}
        <div className="px-4 py-4 text-gray-300 overflow-x-auto w-full">
          {lines.map((line, i) => (
            <pre key={i} className="leading-relaxed whitespace-pre font-mono">
              {line || ' '}
            </pre>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#007ACC] text-white text-xs">
        <Terminal size={14} />
        <span>Read-only View</span>
      </div>
    </div>
  );
};

export default CodeViewer;
