import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, FileCode2, Code2, Clock, Cpu } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CodeViewer from '../../components/students/CodeViewer';
import TestCaseResults from '../../components/students/TestCaseResults';
import FeedbackPanel from '../../components/students/FeedbackPanel';
import SubmissionTimeline from '../../components/students/SubmissionTimeline';

import { submissionsData } from '../../data/submissions';
import { studentsData } from '../../data/students';
import { assignmentsData } from '../../data/assignments';
import { problemsData } from '../../data/problems';

const SubmissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const found = submissionsData.find(s => s.id === parseInt(id));
    if (found) setSubmission(found);
    else navigate('/submissions');
  }, [id, navigate]);

  if (!submission) return <div className="p-8 text-center">Loading...</div>;

  const student = studentsData.find(s => s.id === submission.studentId);
  const assignment = assignmentsData.find(a => a.id === submission.assignmentId);
  const problem = problemsData.find(p => p.id === submission.problemId);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link 
            to="/submissions" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
          >
            <ArrowLeft size={18} />
            Back to Submissions
          </Link>
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-3">
            Submission Review
            <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${
              submission.status === 'Passed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {submission.status}
            </span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Span 2): Code & Test Cases */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gray-400" />
                  <Link to={`/students/${student?.id}`} className="font-semibold text-primary hover:underline">
                    {student?.name || 'Unknown Student'}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <FileCode2 size={18} className="text-gray-400" />
                  <span className="font-medium text-gray-700">{assignment?.title || 'Unknown'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Clock size={16}/> {submission.executionTime}</span>
                <span className="flex items-center gap-1.5"><Cpu size={16}/> {submission.memoryUsed}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Code2 size={18} className="text-primary" /> Submitted Code
                </h3>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Problem: {problem?.title || 'Unknown'}
                </span>
              </div>
              <CodeViewer code={submission.code} language={submission.language} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <TestCaseResults testCases={submission.testCases} score={submission.score} />
          </motion.div>

        </div>

        {/* Right Column: Feedback & Timeline */}
        <div className="space-y-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <FeedbackPanel initialFeedback={submission.feedback} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SubmissionTimeline submission={submission} />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
