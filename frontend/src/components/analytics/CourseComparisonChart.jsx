import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { courseComparisonData } from '../../data/analytics';
import { BookOpen } from 'lucide-react';

const CourseComparisonChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <BookOpen size={20} className="text-purple-500" /> Course Comparison
      </h3>
      <p className="text-sm text-gray-500 mb-2">Multi-metric comparison across all active courses.</p>
      
      <div className="flex-1 min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={courseComparisonData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
            
            <Radar name="Avg Score" dataKey="avgScore" stroke="#FF8C42" fill="#FF8C42" fillOpacity={0.4} />
            <Radar name="Completion Rate" dataKey="completion" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
            <Radar name="Participation" dataKey="participation" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
            
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseComparisonChart;
