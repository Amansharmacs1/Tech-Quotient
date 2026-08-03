import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const StudentFilters = ({ 
  searchTerm, setSearchTerm, 
  filterCourse, setFilterCourse, 
  filterStatus, setFilterStatus,
  sortBy, setSortBy 
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, roll no, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-gray-500">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
        >
          <option value="">All Courses</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Database Management">Database Management</option>
          <option value="Operating Systems">Operating Systems</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
        >
          <option value="name">Sort by: Name</option>
          <option value="highestScore">Sort by: Highest Score</option>
          <option value="lowestScore">Sort by: Lowest Score</option>
        </select>
      </div>
    </div>
  );
};

export default StudentFilters;
