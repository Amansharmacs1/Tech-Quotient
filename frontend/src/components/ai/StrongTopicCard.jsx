import React from 'react';
import { TrendingUp, Award } from 'lucide-react';
import InsightCard from './InsightCard';

const StrongTopicCard = () => {
  const topics = [
    { name: 'Arrays', score: 89 },
    { name: 'Strings', score: 86 },
    { name: 'Linked Lists', score: 82 },
  ];

  return (
    <InsightCard 
      title="Strong Topics" 
      icon={TrendingUp}
      colorClass="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
    >
      <div className="space-y-5">
        {topics.map((topic, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800 flex items-center gap-2">
                <Award size={16} className="text-green-600" /> {topic.name}
              </span>
              <span className="font-bold text-green-700">{topic.score}%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5 shadow-inner border border-green-100 overflow-hidden">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${topic.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </InsightCard>
  );
};

export default StrongTopicCard;
