import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ActivityCard from '../components/ActivityCard';
import ChartCard from '../components/ChartCard';
import AIInsightCard from '../components/AIInsightCard';
import { getDashboardAnalytics } from '../services/analyticsService';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardAnalytics();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <Link to="/assignments/create" className="bg-gradient-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Create Assignment
        </Link>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={loading ? '...' : data?.metrics?.totalStudents || 0} subtitle="Across all courses" iconName="Users" trend="neutral" />
        <StatCard title="Assignments" value={loading ? '...' : data?.metrics?.activeAssignments || 0} subtitle="Active assignments" iconName="Clipboard" trend="neutral" />
        <StatCard title="Active Courses" value={loading ? '...' : data?.metrics?.activeCourses || 0} subtitle="Courses created" iconName="Code" trend="neutral" />
        <StatCard title="Average Score" value={loading ? '...' : `${data?.metrics?.avgClassScore || 0}%`} subtitle="Overall performance" iconName="ChartBar" trend="neutral" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts - spans 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[350px]">
             <ChartCard type="bar" data={data?.performanceData} />
             <ChartCard type="line" data={data?.performanceData} />
          </div>
        </div>

        {/* Sidebar content - spans 1 column */}
        <div className="space-y-6 flex flex-col h-full">
           <div className="flex-1">
             <AIInsightCard />
           </div>
           <div className="flex-1">
             <ActivityCard activities={data?.recentSubmissions || []} />
           </div>
        </div>

      </div>
    </div>
  );
}
