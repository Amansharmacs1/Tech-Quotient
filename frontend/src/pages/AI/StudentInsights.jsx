import React, { useState, useEffect } from 'react';
import { ArrowLeft, BrainCircuit, Users, CheckCircle2, TrendingUp, AlertCircle, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import WeakTopicCard from '../../components/ai/WeakTopicCard';
import StrongTopicCard from '../../components/ai/StrongTopicCard';
import RecommendationCard from '../../components/ai/RecommendationCard';
import { generateStudentInsights } from '../../services/aiService';
import LoadingAnimation from '../../components/ai/LoadingAnimation';

const StudentInsights = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    generateStudentInsights().then(() => setLoading(false));
  }, []);

  const studentsNeedingAttention = [
    { name: 'Rahul Kumar', course: 'DSA', topic: 'Graphs', score: '52%', recommendation: 'Additional Graph Practice' },
    { name: 'Priya Sharma', course: 'Algorithms', topic: 'Dynamic Programming', score: '48%', recommendation: 'Review DP Concepts' },
    { name: 'Amit Singh', course: 'DSA', topic: 'Backtracking', score: '55%', recommendation: 'Assign Easy Backtracking Problems' }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
            <ArrowLeft size={18} /> Back to AI Hub
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BrainCircuit className="text-primary" size={32} /> AI Student Insights
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Turn student performance data into actionable teaching insights.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 focus:ring-0 cursor-pointer">
            <option>All Courses</option>
            <option>Data Structures</option>
            <option>Algorithms</option>
          </select>
          <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 focus:ring-0 cursor-pointer hidden sm:block">
            <option>All Assignments</option>
            <option>Assignment 1</option>
          </select>
          <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 focus:ring-0 cursor-pointer">
            <option>Last 30 Days</option>
            <option>This Semester</option>
          </select>
          <button className="p-2 text-gray-400 hover:text-primary bg-gray-50 rounded-lg">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 shadow-sm mt-8">
          <LoadingAnimation text="TechQuotient AI is analyzing student performance..." />
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><BrainCircuit size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Overall Performance</p><p className="text-2xl font-bold text-gray-900">78%</p></div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0"><CheckCircle2 size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Completion Rate</p><p className="text-2xl font-bold text-gray-900">84%</p></div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0"><TrendingUp size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Students Improving</p><p className="text-2xl font-bold text-gray-900">42</p></div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0"><AlertCircle size={24} /></div>
              <div><p className="text-sm text-gray-500 font-medium">Need Attention</p><p className="text-2xl font-bold text-gray-900">12</p></div>
            </div>
          </div>

          {/* Text Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><BrainCircuit size={20} className="text-blue-600" /> AI-Generated Insights</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div><p className="text-gray-700">68% of students performed well in Arrays, but Graph Algorithms have an average score of only 54%.</p></li>
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div><p className="text-gray-700">Students are performing well on Easy problems but success drops significantly for Medium-level problems.</p></li>
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div><p className="text-gray-700">Dynamic Programming has the highest average number of failed attempts.</p></li>
            </ul>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeakTopicCard />
            <div className="space-y-6">
              <StrongTopicCard />
              <RecommendationCard />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
              <Users size={20} className="text-red-500" />
              <h3 className="font-bold text-gray-900 text-lg">Students Needing Attention</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Weak Topic</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Score</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Recommendation</th>
                    <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {studentsNeedingAttention.map((student, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{student.name}</td>
                      <td className="p-4 text-sm text-gray-600">{student.course}</td>
                      <td className="p-4 text-sm font-medium text-red-600">{student.topic}</td>
                      <td className="p-4 font-bold text-gray-900">{student.score}</td>
                      <td className="p-4 text-sm text-gray-600">{student.recommendation}</td>
                      <td className="p-4 text-right">
                        <Link to="/students" className="text-sm font-bold text-primary hover:underline">View Student</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default StudentInsights;
