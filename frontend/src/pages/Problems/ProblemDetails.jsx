import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Copy, Archive, CheckCircle2, Terminal, AlignLeft, Eye, EyeOff, Activity, Clock, Award, Target } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { globalProblems } from './Problems';
import DeleteProblemModal from '../../components/problems/DeleteProblemModal';

const getDifficultyColor = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API Fetch
    const foundProblem = globalProblems.find(p => p.id === parseInt(id));
    if (foundProblem) {
      setProblem(foundProblem);
    } else {
      navigate('/problems');
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const index = globalProblems.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      globalProblems.splice(index, 1);
    }
    navigate('/problems');
  };

  if (!problem) return <div className="p-8 text-center">Loading...</div>;

  const sampleTestCases = problem.testCases?.filter(tc => tc.visibility === 'Sample') || [];
  const hiddenTestCasesCount = problem.testCases?.filter(tc => tc.visibility === 'Hidden').length || 0;

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-6">
        <Link 
          to="/problems" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={18} />
          Back to Problems
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-secondary">{problem.title}</h1>
              <span className={`px-3 py-1 text-sm font-bold rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                problem.status === 'Published' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
                {problem.status}
              </span>
            </div>
            <p className="text-gray-500 font-medium">{problem.course} • {problem.topic}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/problems/edit/${problem.id}`}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Edit2 size={16} /> Edit
            </Link>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Copy size={16} /> Duplicate
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Archive size={16} /> Archive
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content: Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlignLeft size={20} className="text-primary" /> Problem Statement
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 whitespace-pre-wrap">
              {problem.statement}
            </div>

            {problem.inputFormat && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Input Format</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{problem.inputFormat}</p>
              </div>
            )}

            {problem.outputFormat && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Output Format</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{problem.outputFormat}</p>
              </div>
            )}

            {problem.constraints && problem.constraints.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Constraints</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Test Cases */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Terminal size={20} className="text-primary" /> Sample Test Cases
              </h2>
              {hiddenTestCasesCount > 0 && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                  <EyeOff size={16} /> {hiddenTestCasesCount} Hidden Cases
                </div>
              )}
            </div>

            <div className="space-y-6">
              {sampleTestCases.length > 0 ? (
                sampleTestCases.map((tc, index) => (
                  <div key={tc.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-gray-700 flex items-center gap-2">
                      <Eye size={16} className="text-gray-400" /> Example {index + 1}
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Input</div>
                        <pre className="bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">{tc.input}</pre>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Output</div>
                        <pre className="bg-gray-50 p-3 rounded-lg border border-gray-100 font-mono text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">{tc.output}</pre>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 italic border border-dashed border-gray-200 rounded-xl">
                  No sample test cases provided.
                </div>
              )}
            </div>

            {problem.explanation && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Explanation</h3>
                <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">{problem.explanation}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar: Right Column */}
        <div className="space-y-6">
          {/* Languages */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary" /> Supported Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {problem.language?.map(lang => (
                <span key={lang} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm">
                  {lang}
                </span>
              ))}
              {(!problem.language || problem.language.length === 0) && (
                <span className="text-gray-500 italic">No languages selected</span>
              )}
            </div>
          </motion.div>

          {/* Performance Statistics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-primary" /> Performance Stats
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-gray-500"><Target size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Total Attempts</span>
                </div>
                <span className="font-bold text-gray-900">{problem.submissions || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-green-500"><CheckCircle2 size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Success Rate</span>
                </div>
                <span className="font-bold text-gray-900">
                  {problem.submissions ? '68%' : '0%'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-blue-500"><Clock size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Avg Runtime</span>
                </div>
                <span className="font-bold text-gray-900">45ms</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-yellow-500"><Award size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Avg Score</span>
                </div>
                <span className="font-bold text-gray-900">8.5/10</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DeleteProblemModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        problemTitle={problem.title}
      />
    </div>
  );
};

export default ProblemDetails;
