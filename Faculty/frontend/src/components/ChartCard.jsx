import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const barData = [
  { name: 'Arrays', solved: 80 },
  { name: 'Strings', solved: 65 },
  { name: 'Trees', solved: 45 },
  { name: 'Graphs', solved: 35 },
  { name: 'DP', solved: 30 },
];

const lineData = [
  { name: 'Week 1', accuracy: 70 },
  { name: 'Week 2', accuracy: 75 },
  { name: 'Week 3', accuracy: 82 },
  { name: 'Week 4', accuracy: 88 },
];

export default function ChartCard({ type }) {
  const isBar = type === 'bar';
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-secondary mb-6">
        {isBar ? 'Problems Solved' : 'Submission Accuracy'}
      </h3>
      
      <div className="flex-1 w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          {isBar ? (
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                cursor={{ fill: '#FFF1E8' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="solved" fill="#F26422" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          ) : (
            <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="#F26422" strokeWidth={3} dot={{ r: 4, fill: '#F26422' }} activeDot={{ r: 6 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
