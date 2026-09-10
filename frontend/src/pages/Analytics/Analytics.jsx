import React, { useState, useEffect } from 'react';
import AnalyticsStats from '../../components/analytics/AnalyticsStats';
import PerformanceOverview from '../../components/analytics/PerformanceOverview';
import StudentPerformanceChart from '../../components/analytics/StudentPerformanceChart';
import DateFilter from '../../components/analytics/DateFilter';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFullAnalytics } from '../../services/analyticsService';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFullAnalytics();
        setData(result);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Analytics & Reports</h1>
          <p className="text-gray-500">Gain insights into student performance, course effectiveness, and assignment outcomes.</p>
        </div>
        <div className="flex items-center gap-4">
          <DateFilter />
          <Link
            to="/reports"
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <Download size={20} />
            Export Data
          </Link>
        </div>
      </div>

      <AnalyticsStats />
      
      <PerformanceOverview data={data?.weeklyActivity} />

      <div className="mb-8">
        <h2 className="text-xl font-bold text-secondary mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/analytics/course" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-center font-semibold text-gray-700 hover:text-primary">
            Course Analytics
          </Link>
          <Link to="/analytics/student" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-center font-semibold text-gray-700 hover:text-primary">
            Student Analytics
          </Link>
          <Link to="/analytics/assignment" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-center font-semibold text-gray-700 hover:text-primary">
            Assignment Analytics
          </Link>
        </div>
      </div>

      <StudentPerformanceChart data={data?.topicPerformance} />
    </div>
  );
};

export default Analytics;
