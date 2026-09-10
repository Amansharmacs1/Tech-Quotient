import React from 'react';
import { Award } from 'lucide-react';

const ScoreCard = ({ title, score, maxScore = 100, subtitle, colorClass = "text-primary bg-primary/10" }) => {
  const percentage = Math.round((score / maxScore) * 100);
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
        <Award size={28} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <div className="flex items-end gap-2">
          <h3 className="text-3xl font-bold text-gray-900 leading-none">{score}</h3>
          <span className="text-sm text-gray-400 font-medium pb-0.5">/ {maxScore}</span>
        </div>
        {subtitle && (
          <p className="text-xs font-semibold mt-2 text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
