import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProblems } from '../../services/problemService';

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
    case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const ProblemSelector = ({ selectedProblemIds, onChange, courseId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [availableProblems, setAvailableProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableProblems = async () => {
      setLoading(true);
      try {
        const data = await getProblems(courseId ? { course: courseId } : {});
        setAvailableProblems(data);
      } catch (err) {
        console.error('Failed to load problems for selection');
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableProblems();
  }, [courseId]);

  const filteredProblems = availableProblems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = difficultyFilter ? p.difficulty === difficultyFilter : true;
    const matchesTopic = topicFilter ? p.topic === topicFilter : true;
    // Don't show problems that are already selected
    const notSelected = !selectedProblemIds.includes(p._id);
    return matchesSearch && matchesDiff && matchesTopic && notSelected;
  });

  const selectedProblemsData = selectedProblemIds
    .map(id => availableProblems.find(p => p._id === id))
    .filter(Boolean);

  const addProblem = (id) => {
    onChange([...selectedProblemIds, id]);
  };

  const removeProblem = (id) => {
    onChange(selectedProblemIds.filter(pid => pid !== id));
  };

  return (
    <div className="space-y-6">
      {/* Selected Problems List */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Code2 size={18} className="text-primary" /> Selected Problems ({selectedProblemIds.length})
        </h4>
        
        <div className="space-y-2">
          <AnimatePresence>
            {selectedProblemsData.map((problem) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{problem.title}</p>
                  <p className="text-xs text-gray-500">{problem.topic} • {problem.difficulty}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeProblem(problem._id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {selectedProblemIds.length === 0 && (
            <div className="text-sm text-gray-500 italic text-center py-4">
              No problems selected yet. Search below to add problems.
            </div>
          )}
        </div>
      </div>

      {/* Problem Search Interface */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-sm font-bold text-gray-700 mb-4">Search & Add Problems {courseId ? '(Filtered by Course)' : ''}</h4>
        
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="">All Topics</option>
            <option value="Arrays">Arrays</option>
            <option value="Strings">Strings</option>
            <option value="Trees">Trees</option>
            <option value="Graphs">Graphs</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
          </select>
        </div>

        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
          {loading ? (
             <div className="text-sm text-gray-500 text-center py-6">Loading problems...</div>
          ) : filteredProblems.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-6">
              No available problems match your search criteria.
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <div key={problem._id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{problem.title}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {problem.topic}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addProblem(problem._id)}
                  className="p-1.5 text-primary hover:text-white hover:bg-primary rounded-md transition-colors border border-primary/20 flex items-center gap-1 text-sm font-medium"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSelector;
