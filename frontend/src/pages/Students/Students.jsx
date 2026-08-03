import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Download } from 'lucide-react';
import StudentStats from '../../components/students/StudentStats';
import StudentFilters from '../../components/students/StudentFilters';
import StudentCard from '../../components/students/StudentCard';
import StudentTable from '../../components/students/StudentTable';
import EmptyStudentState from '../../components/students/EmptyStudentState';

// Dummy Data
import { studentsData } from '../../data/students';

const Students = () => {
  const [students] = useState(studentsData);
  const [viewMode, setViewMode] = useState('grid');
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Derived state
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.rollNo.includes(searchTerm) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse ? student.course === filterCourse : true;
    const matchesStatus = filterStatus ? student.status === filterStatus : true;

    return matchesSearch && matchesCourse && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'highestScore') return b.averageScore - a.averageScore;
    if (sortBy === 'lowestScore') return a.averageScore - b.averageScore;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Student Management</h1>
          <p className="text-gray-500">Monitor enrolled students and their learning progress.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-accent text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-accent text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              title="Table View"
            >
              <List size={20} />
            </button>
          </div>
          <button
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      <StudentStats students={students} />

      <StudentFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterCourse={filterCourse} setFilterCourse={setFilterCourse}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {students.length === 0 ? (
        <EmptyStudentState />
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg">No students match your current filters.</p>
          <button 
            onClick={() => {
              setSearchTerm(''); setFilterCourse(''); setFilterStatus('');
            }}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredStudents.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StudentTable students={filteredStudents} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Students;
