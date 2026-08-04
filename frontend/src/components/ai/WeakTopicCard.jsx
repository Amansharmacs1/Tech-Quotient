import React from 'react';
import { Target, TrendingDown } from 'lucide-react';
import InsightCard from './InsightCard';
import { studentInsights } from '../../data/aiResponses';

const WeakTopicCard = () => {
  return (
    <InsightCard 
      title="At-Risk Topics" 
      icon={TrendingDown}
      colorClass="bg-gradient-to-br from-red-50 to-pink-50 border-red-100"
    >
      <p className="text-sm text-gray-600 mb-6">AI analysis indicates students are struggling significantly with the following concepts.</p>
      
      <div className="space-y-4">
        {studentInsights.weakTopics.map((topic, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{topic.topic}</h4>
                <p className="text-xs text-gray-500 font-medium">{topic.impact} Impact on Overall Grade</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-red-600">{topic.score}%</span>
              <p className="text-xs text-gray-400 font-medium">Avg Score</p>
            </div>
          </div>
        ))}
      </div>
    </InsightCard>
  );
};

export default WeakTopicCard;
