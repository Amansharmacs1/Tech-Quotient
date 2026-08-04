import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { assignmentCompletionData } from '../../data/analytics';
import { CheckCircle2 } from 'lucide-react';

const AssignmentCompletionChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <CheckCircle2 size={20} className="text-green-500" /> Assignment Completion
      </h3>
      <p className="text-sm text-gray-500 mb-4">Overall status of assigned problems.</p>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={assignmentCompletionData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {assignmentCompletionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [value.toLocaleString(), 'Count']}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssignmentCompletionChart;
