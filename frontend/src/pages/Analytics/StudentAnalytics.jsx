import React from 'react';
import { ArrowLeft, User, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import DateFilter from '../../components/analytics/DateFilter';
import TopicPerformanceChart from '../../components/analytics/TopicPerformanceChart';
import { topStudents } from '../../data/analytics';

const StudentAnalytics = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link 
            to="/analytics" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
          >
            <ArrowLeft size={18} />
            Back to Overview
          </Link>
          <h1 className="text-3xl font-bold text-secondary">Student Analytics</h1>
          <p className="text-gray-500 mt-1">Analyze individual student performance and class rankings.</p>
        </div>
        <DateFilter />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Rankings Table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" /> Class Leaderboard
          </h3>
          <div className="overflow-y-auto flex-1 pr-2">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-gray-100 text-gray-500 font-medium">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4 text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((student, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">#{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-700 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
                        {student.name.charAt(0)}
                      </div>
                      {student.name}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-primary">{student.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Topic Analysis */}
        <div className="h-[400px]">
          <TopicPerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
