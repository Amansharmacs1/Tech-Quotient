import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import InsightCard from './InsightCard';
import { Link } from 'react-router-dom';

const RecommendationCard = () => {
  const recommendations = [
    { text: "Schedule additional Graph practice.", action: "Create Assignment", link: "/assignments/create" },
    { text: "Create a Medium-level Dynamic Programming assignment.", action: "Create Problem", link: "/problems/create" },
    { text: "Review recursion concepts before introducing advanced DP.", action: null },
    { text: "Provide targeted practice to students scoring below 60%.", action: "View Analytics", link: "/analytics" }
  ];

  return (
    <InsightCard 
      title="AI Recommendations" 
      icon={Lightbulb}
      colorClass="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100"
    >
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="bg-white/80 p-4 rounded-xl border border-orange-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <span className="font-medium text-gray-800 leading-snug">{rec.text}</span>
            {rec.action && (
              <Link to={rec.link} className="shrink-0 px-4 py-2 bg-white border border-orange-200 text-primary text-sm font-bold rounded-lg hover:bg-orange-50 transition-colors shadow-sm flex items-center gap-2">
                {rec.action} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </InsightCard>
  );
};

export default RecommendationCard;
