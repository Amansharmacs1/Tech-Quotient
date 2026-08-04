import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import WeakTopicCard from '../../components/ai/WeakTopicCard';
import RecommendationCard from '../../components/ai/RecommendationCard';
import InsightCard from '../../components/ai/InsightCard';
import { studentInsights } from '../../data/aiResponses';

const StudentInsights = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
          <ArrowLeft size={18} /> Back to AI Hub
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Student Insights</h1>
        <p className="text-gray-500 mt-1">AI-powered analysis of class performance and learning gaps.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakTopicCard />
        
        <div className="flex flex-col gap-6">
          <RecommendationCard />
          
          <InsightCard 
            title="Class Trend" 
            icon={TrendingUp}
            colorClass="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
          >
            <div className="flex items-center gap-4 text-green-700 font-medium">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 shadow-sm border border-green-200">
                <TrendingUp size={24} />
              </div>
              <p className="text-lg leading-snug">{studentInsights.improvementTrend}</p>
            </div>
          </InsightCard>
        </div>
      </div>
    </div>
  );
};

export default StudentInsights;
