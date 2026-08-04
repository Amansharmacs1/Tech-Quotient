import React from 'react';
import { ArrowLeft, Clock, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyAIState from '../../components/ai/EmptyAIState';

const AIHistory = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
            <ArrowLeft size={18} /> Back to AI Hub
          </Link>
          <h1 className="text-3xl font-bold text-secondary">AI Generation History</h1>
          <p className="text-gray-500 mt-1">Access your previously generated problems, assignments, and insights.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm mt-8">
        <EmptyAIState message="No History Found" />
        <p className="text-center text-sm text-gray-400 mt-4 max-w-md mx-auto">
          You haven't saved any AI-generated content yet. Use the Problem or Assignment generators to create content, then click "Save" to archive it here.
        </p>
      </div>
    </div>
  );
};

export default AIHistory;
