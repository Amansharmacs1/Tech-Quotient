import React from 'react';
import { Plus } from 'lucide-react';
import StatCard from '../components/StatCard';
import ActivityCard from '../components/ActivityCard';
import ChartCard from '../components/ChartCard';
import AIInsightCard from '../components/AIInsightCard';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Welcome back, Professor 👋</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Manage your courses, coding problems and student performance.
          </p>
        </div>
        <button className="bg-gradient-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="250" subtitle="+12% this month" iconName="Users" trend="up" />
        <StatCard title="Assignments" value="32" subtitle="Active assignments" iconName="Clipboard" trend="neutral" />
        <StatCard title="Coding Problems" value="150" subtitle="Problems created" iconName="Code" trend="neutral" />
        <StatCard title="Average Score" value="82%" subtitle="Overall performance" iconName="ChartBar" trend="neutral" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts - spans 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[350px]">
             <ChartCard type="bar" />
             <ChartCard type="line" />
          </div>
        </div>

        {/* Sidebar content - spans 1 column */}
        <div className="space-y-6 flex flex-col h-full">
           <div className="flex-1">
             <AIInsightCard />
           </div>
           <div className="flex-1">
             <ActivityCard />
           </div>
        </div>

      </div>
    </div>
  );
}
