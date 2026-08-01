import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProblemStats from '../../components/problems/ProblemStats';
import ProblemFilters from '../../components/problems/ProblemFilters';
import ProblemCard from '../../components/problems/ProblemCard';
import ProblemTable from '../../components/problems/ProblemTable';
import EmptyProblemState from '../../components/problems/EmptyProblemState';
import DeleteProblemModal from '../../components/problems/DeleteProblemModal';

// Dummy Data export from phase 1
import { problemsData } from '../../data/problems';

// Use a simulated global variable to persist state between route changes
let globalProblems = [...problemsData];

const Problems = () => {
  const [problems, setProblems] = useState(globalProblems);
  const [viewMode, setViewMode] = useState('grid');
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);

  // Sync to global memory when local state changes (simulate DB)
  useEffect(() => {
    globalProblems = [...problems];
  }, [problems]);

  // Derived state (Filtering & Sorting)
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse ? problem.course === filterCourse : true;
    const matchesDifficulty = filterDifficulty ? problem.difficulty === filterDifficulty : true;
    const matchesTopic = filterTopic ? problem.topic === filterTopic : true;
    const matchesStatus = filterStatus ? problem.status === filterStatus : true;

    return matchesSearch && matchesCourse && matchesDifficulty && matchesTopic && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'submissions') return b.submissions - a.submissions;
    if (sortBy === 'difficulty') {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    return 0;
  });

  const handleDeleteClick = (problem) => {
    setProblemToDelete(problem);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (problemToDelete) {
      setProblems(prev => prev.filter(p => p.id !== problemToDelete.id));
      setProblemToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Coding Problem Management</h1>
          <p className="text-gray-500">Create, organize, and manage programming questions for your courses.</p>
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
            to="/problems/create"
            className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-primary/30 hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Create Problem
          </Link>
        </div>
      </div>

      <ProblemStats problems={problems} />

      <ProblemFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterCourse={filterCourse} setFilterCourse={setFilterCourse}
        filterDifficulty={filterDifficulty} setFilterDifficulty={setFilterDifficulty}
        filterTopic={filterTopic} setFilterTopic={setFilterTopic}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {/* Main Content Area */}
      {problems.length === 0 ? (
        <EmptyProblemState />
      ) : filteredProblems.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No problems match your current filters.</p>
          <button 
            onClick={() => {
              setSearchTerm(''); setFilterCourse(''); setFilterDifficulty(''); setFilterTopic(''); setFilterStatus('');
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
              {filteredProblems.map(problem => (
                <ProblemCard 
                  key={problem.id} 
                  problem={problem} 
                  onDeleteClick={handleDeleteClick} 
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
              <ProblemTable 
                problems={filteredProblems} 
                onDeleteClick={handleDeleteClick} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Modal */}
      <DeleteProblemModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        problemTitle={problemToDelete?.title}
      />
    </div>
  );
};

export default Problems;
export { globalProblems };
