import React from 'react';
import { Lightbulb, CheckCircle } from 'lucide-react';
import InsightCard from './InsightCard';
import { studentInsights } from '../../data/aiResponses';

const RecommendationCard = () => {
  return (
    <InsightCard 
      title="Actionable Recommendations" 
      icon={Lightbulb}
      colorClass="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100"
    >
      <ul className="space-y-4">
        {studentInsights.recommendations.map((rec, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-800 bg-white/60 p-4 rounded-xl border border-orange-200/50">
            <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
            <span className="font-medium leading-snug">{rec}</span>
          </li>
        ))}
      </ul>
      <button className="w-full mt-6 py-2.5 bg-white text-primary font-bold rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors shadow-sm">
        Generate Recommended Content
      </button>
    </InsightCard>
  );
};

export default RecommendationCard;
