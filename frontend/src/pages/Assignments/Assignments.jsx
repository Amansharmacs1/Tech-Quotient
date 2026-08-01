import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AssignmentStats from '../../components/assignments/AssignmentStats';
import AssignmentFilters from '../../components/assignments/AssignmentFilters';
import AssignmentCard from '../../components/assignments/AssignmentCard';
import AssignmentTable from '../../components/assignments/AssignmentTable';
import EmptyAssignmentState from '../../components/assignments/EmptyAssignmentState';
import DeleteAssignmentModal from '../../components/assignments/DeleteAssignmentModal';
import PublishModal from '../../components/assignments/PublishModal';

// Dummy Data
import { assignmentsData } from '../../data/assignments';

// Simulated global store
let globalAssignments = [...assignmentsData];

const Assignments = () => {
  const [assignments, setAssignments] = useState(globalAssignments);
  const [viewMode, setViewMode] = useState('grid');
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Sync to global memory
  useEffect(() => {
    globalAssignments = [...assignments];
  }, [assignments]);

  // Derived state (Filtering & Sorting)
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse ? assignment.course === filterCourse : true;
    const matchesStatus = filterStatus ? assignment.status === filterStatus : true;

    return matchesSearch && matchesCourse && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'latest') return b.id - a.id;
    if (sortBy === 'submissions') return b.submissions - a.submissions;
    if (sortBy === 'course') return a.course.localeCompare(b.course);
    if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
    return 0;
  });

  const handleDeleteClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteModalOpen(true);
  };

  const handlePublishClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsPublishModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAssignment) {
      setAssignments(prev => prev.filter(a => a.id !== selectedAssignment.id));
      setSelectedAssignment(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleConfirmPublish = () => {
    if (selectedAssignment) {
      setAssignments(prev => prev.map(a => 
        a.id === selectedAssignment.id ? { ...a, status: 'Published' } : a
      ));
      setSelectedAssignment(null);
      setIsPublishModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Assignment Management</h1>
          <p className="text-gray-500">Create, publish, and monitor coding assignments.</p>
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
          <Link
            to="/assignments/create"
            className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-primary/30 hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Create Assignment
          </Link>
        </div>
      </div>

      <AssignmentStats assignments={assignments} />

      <AssignmentFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterCourse={filterCourse} setFilterCourse={setFilterCourse}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {assignments.length === 0 ? (
        <EmptyAssignmentState />
      ) : filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No assignments match your current filters.</p>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment} 
                  onDeleteClick={handleDeleteClick}
                  onPublishClick={handlePublishClick}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AssignmentTable 
                assignments={filteredAssignments} 
                onDeleteClick={handleDeleteClick}
                onPublishClick={handlePublishClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <DeleteAssignmentModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        assignmentTitle={selectedAssignment?.title}
      />

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={handleConfirmPublish}
        assignmentTitle={selectedAssignment?.title}
      />
    </div>
  );
};

export default Assignments;
export { globalAssignments };
