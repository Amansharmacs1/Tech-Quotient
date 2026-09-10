import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { difficultyAnalysis } from '../../data/analytics';
import { Target } from 'lucide-react';

const DifficultyAnalysisChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <Target size={20} className="text-red-500" /> Difficulty Analysis
      </h3>
      <p className="text-sm text-gray-500 mb-6">Success vs Failure rates by problem difficulty.</p>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={difficultyAnalysis} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="difficulty" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value}%`, 'Percentage']}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            <Bar dataKey="success" name="Success Rate" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={40} />
            <Bar dataKey="failed" name="Failure Rate" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DifficultyAnalysisChart;
