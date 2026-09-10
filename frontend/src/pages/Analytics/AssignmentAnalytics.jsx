import React from 'react';
import { ArrowLeft, Target, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import DateFilter from '../../components/analytics/DateFilter';
import AssignmentCompletionChart from '../../components/analytics/AssignmentCompletionChart';
import DifficultyAnalysisChart from '../../components/analytics/DifficultyAnalysisChart';

const AssignmentAnalytics = () => {
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
          <h1 className="text-3xl font-bold text-secondary">Assignment Analytics</h1>
          <p className="text-gray-500 mt-1">Analyze assignment completion rates and problem difficulty trends.</p>
        </div>
        <DateFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Target size={20} />
            <h3 className="font-bold">Most Attempted</h3>
          </div>
          <p className="text-xl font-bold text-gray-900 mt-4 truncate" title="Data Structures Assignment 1">Data Structures Assignment 1</p>
          <p className="text-sm text-gray-500 mt-1">120 Submissions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-green-500">
            <FileText size={20} />
            <h3 className="font-bold">Highest Avg Score</h3>
          </div>
          <p className="text-xl font-bold text-gray-900 mt-4 truncate" title="DBMS Lab 2">DBMS Lab 2</p>
          <p className="text-sm text-gray-500 mt-1">92% Average</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-red-500">
            <FileText size={20} />
            <h3 className="font-bold">Lowest Avg Score</h3>
          </div>
          <p className="text-xl font-bold text-gray-900 mt-4 truncate" title="Advanced Trees">Advanced Trees</p>
          <p className="text-sm text-gray-500 mt-1">55% Average</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[400px]">
          <AssignmentCompletionChart />
        </div>
        <div className="h-[400px]">
          <DifficultyAnalysisChart />
        </div>
      </div>
    </div>
  );
};

export default AssignmentAnalytics;
