import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';

export default function AIInsightCard() {
  return (
    <div className="bg-accent rounded-xl shadow-sm p-6 border border-orange-100 h-full relative overflow-hidden group hover:shadow-md transition-shadow">
      {/* Decorative background element */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-secondary">AI Insight</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-secondary font-medium text-lg leading-snug">
          Students are struggling with <br/>
          <span className="text-primary font-bold">Dynamic Programming.</span>
        </p>
      </div>
      
      <div className="bg-white/60 p-4 rounded-lg border border-orange-200/50">
        <p className="text-xs text-orange-800 font-semibold uppercase tracking-wider mb-1">Recommendation</p>
        <p className="text-secondary text-sm font-medium">Create more DP practice problems.</p>
      </div>
      
      <button className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-light transition-colors">
        Take Action <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
