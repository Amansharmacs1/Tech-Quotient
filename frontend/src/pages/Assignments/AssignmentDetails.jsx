import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Send, Users, CheckCircle2, Target, BarChart2, Calendar, Clock, Award, FileCode2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { globalAssignments } from './Assignments';
import { problemsData } from '../../data/problems';
import PublishModal from '../../components/assignments/PublishModal';

const AssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API Fetch
    const foundAssignment = globalAssignments.find(a => a.id === parseInt(id));
    if (foundAssignment) {
      setAssignment(foundAssignment);
    } else {
      navigate('/assignments');
    }
  }, [id, navigate]);

  const handlePublish = () => {
    const index = globalAssignments.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      globalAssignments[index].status = 'Published';
      setAssignment({ ...assignment, status: 'Published' });
    }
    setIsPublishModalOpen(false);
  };

  if (!assignment) return <div className="p-8 text-center">Loading...</div>;

  const isDraft = assignment.status === 'Draft';
  
  // Resolve the actual problem objects from the IDs
  const attachedProblems = assignment.problemIds 
    ? assignment.problemIds.map(pid => problemsData.find(p => p.id === pid)).filter(Boolean)
    : [];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-6">
        <Link 
          to="/assignments" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={18} />
          Back to Assignments
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-secondary">{assignment.title}</h1>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                assignment.status === 'Published' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
                {assignment.status}
              </span>
            </div>
            <p className="text-gray-500 font-medium">{assignment.course}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/assignments/edit/${assignment.id}`}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Edit2 size={16} /> Edit
            </Link>
            <Link
              to={`/assignments/${assignment.id}/submissions`}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Users size={16} /> View Submissions
            </Link>
            {isDraft && (
              <button 
                onClick={() => setIsPublishModalOpen(true)}
                className="px-4 py-2 bg-blue-600 border border-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send size={16} /> Publish
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content: Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mb-1"><Calendar size={16} /> Deadline</p>
                <p className="font-semibold text-gray-900">{new Date(assignment.deadline).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mb-1"><Clock size={16} /> Time Limit</p>
                <p className="font-semibold text-gray-900">{assignment.timeLimit} mins</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mb-1"><Award size={16} /> Max Marks</p>
                <p className="font-semibold text-gray-900">{assignment.maxMarks}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mb-1"><Target size={16} /> Attempts</p>
                <p className="font-semibold text-gray-900">{assignment.attempts}</p>
              </div>
            </div>

            {assignment.description && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
              </div>
            )}
          </motion.div>

          {/* Attached Problems */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileCode2 size={20} className="text-primary" /> Problems Included ({attachedProblems.length})
              </h2>
            </div>

            <div className="space-y-4">
              {attachedProblems.length > 0 ? (
                attachedProblems.map((problem, index) => (
                  <div key={problem.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-500 shadow-sm text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{problem.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{problem.topic} • {problem.difficulty}</p>
                      </div>
                    </div>
                    <Link
                      to={`/problems/${problem.id}`}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-sm font-medium text-primary rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View Problem
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 italic border border-dashed border-gray-200 rounded-xl">
                  No problems attached to this assignment yet.
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar: Right Column */}
        <div className="space-y-6">
          {/* Analytics Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart2 size={18} className="text-primary" /> Analytics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-gray-500"><Users size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Students Assigned</span>
                </div>
                <span className="font-bold text-gray-900">120</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-blue-500"><Send size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Submissions</span>
                </div>
                <span className="font-bold text-gray-900">{assignment.submissions || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-green-500"><CheckCircle2 size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Completion Rate</span>
                </div>
                <span className="font-bold text-gray-900">
                  {Math.round(((assignment.submissions || 0) / 120) * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md shadow-sm text-yellow-500"><Award size={16} /></div>
                  <span className="text-sm font-medium text-gray-600">Avg Score</span>
                </div>
                <span className="font-bold text-gray-900">{assignment.submissions > 0 ? '82/100' : '-'}</span>
              </div>
            </div>
            
            <Link 
              to={`/assignments/${assignment.id}/submissions`}
              className="mt-6 w-full block text-center px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors"
            >
              View Full Analytics
            </Link>
          </motion.div>
        </div>
      </div>

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={handlePublish}
        assignmentTitle={assignment.title}
      />
    </div>
  );
};

export default AssignmentDetails;
