import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { topicPerformance } from '../../data/analytics';
import { BookOpen } from 'lucide-react';

const COLORS = ['#FF8C42', '#333333', '#10B981', '#3B82F6', '#EF4444'];

const TopicPerformanceChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <BookOpen size={20} className="text-indigo-500" /> Topic Performance Analysis
      </h3>
      <p className="text-sm text-gray-500 mb-6">Success rates categorized by topic.</p>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topicPerformance} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis type="category" dataKey="topic" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} width={120} />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }} 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value}%`, 'Success Rate']}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
              {topicPerformance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopicPerformanceChart;
