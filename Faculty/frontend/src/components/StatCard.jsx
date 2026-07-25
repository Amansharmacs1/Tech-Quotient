import React from 'react';
import * as Icons from 'lucide-react';

export default function StatCard({ title, value, subtitle, iconName, trend }) {
  const Icon = Icons[iconName] || Icons.HelpCircle;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover-scale">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-secondary">{value}</h2>
        {subtitle && (
          <p className={`text-sm mt-2 font-medium ${trend === 'up' ? 'text-green-500' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
