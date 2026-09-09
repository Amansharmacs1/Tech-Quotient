import React from 'react';
import { Target, TrendingDown, Users, AlertTriangle } from 'lucide-react';
import InsightCard from './InsightCard';

const WeakTopicCard = () => {
  const topics = [
    { name: 'Dynamic Programming', score: 52, trend: '-4%', students: 45, severity: 'High' },
    { name: 'Graphs', score: 58, trend: '-2%', students: 38, severity: 'Medium' },
    { name: 'Backtracking', score: 63, trend: '+1%', students: 25, severity: 'Low' },
  ];

  return (
    <InsightCard 
      title="Weak Topics" 
      icon={TrendingDown}
      colorClass="bg-gradient-to-br from-red-50 to-pink-50 border-red-100"
    >
      <div className="space-y-4">
        {topics.map((topic, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={16} className={topic.severity === 'High' ? 'text-red-500' : 'text-orange-400'} />
                <h4 className="font-bold text-gray-900">{topic.name}</h4>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1"><Users size={14} /> {topic.students} affected</span>
                <span>Trend: {topic.trend}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl font-black text-red-600">{topic.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </InsightCard>
  );
};

export default WeakTopicCard;
