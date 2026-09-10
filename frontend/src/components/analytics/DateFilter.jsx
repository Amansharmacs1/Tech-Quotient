import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const DateFilter = () => {
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
        <Calendar size={16} className="text-gray-400" />
        <select 
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-transparent focus:outline-none cursor-pointer appearance-none pr-4"
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="This Semester">This Semester</option>
          <option value="Custom Range">Custom Range...</option>
        </select>
      </div>
    </div>
  );
};

export default DateFilter;
