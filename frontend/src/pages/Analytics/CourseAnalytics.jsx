import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DateFilter from '../../components/analytics/DateFilter';
import CourseComparisonChart from '../../components/analytics/CourseComparisonChart';

const CourseAnalytics = () => {
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
          <h1 className="text-3xl font-bold text-secondary">Course Analytics</h1>
          <p className="text-gray-500 mt-1">Deep dive into course-wise performance and engagement metrics.</p>
        </div>
        <DateFilter />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <CourseComparisonChart />
        
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Course Engagement Summary</h3>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4 text-center">Avg Score</th>
                  <th className="py-3 px-4 text-center">Completion</th>
                  <th className="py-3 px-4 text-center">Engagement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">Data Structures</td>
                  <td className="py-3 px-4 text-center text-gray-600">78%</td>
                  <td className="py-3 px-4 text-center text-gray-600">82%</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">High</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">Database Management</td>
                  <td className="py-3 px-4 text-center text-gray-600">85%</td>
                  <td className="py-3 px-4 text-center text-gray-600">88%</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">High</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">Operating Systems</td>
                  <td className="py-3 px-4 text-center text-gray-600">72%</td>
                  <td className="py-3 px-4 text-center text-gray-600">75%</td>
                  <td className="py-3 px-4 text-center text-yellow-600 font-medium">Medium</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800">Computer Networks</td>
                  <td className="py-3 px-4 text-center text-gray-600">80%</td>
                  <td className="py-3 px-4 text-center text-gray-600">80%</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">High</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-800">Object Oriented Prog.</td>
                  <td className="py-3 px-4 text-center text-gray-600">90%</td>
                  <td className="py-3 px-4 text-center text-gray-600">92%</td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;
