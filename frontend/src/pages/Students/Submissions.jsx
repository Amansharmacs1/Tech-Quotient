import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import SubmissionCard from '../../components/students/SubmissionCard';
import EmptySubmissionState from '../../components/students/EmptySubmissionState';
import { submissionsData } from '../../data/submissions';
import { studentsData } from '../../data/students';
import { assignmentsData } from '../../data/assignments';

const Submissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredSubmissions = submissionsData.filter(sub => {
    const student = studentsData.find(s => s.id === sub.studentId);
    const assignment = assignmentsData.find(a => a.id === sub.assignmentId);
    
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          assignment?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? sub.status === filterStatus : true;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Submissions Dashboard</h1>
        <p className="text-gray-500">Review student code submissions and provide feedback.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by student or assignment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white min-w-[150px]"
        >
          <option value="">All Statuses</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <EmptySubmissionState />
        ) : (
          filteredSubmissions.map((submission, index) => {
            const student = studentsData.find(s => s.id === submission.studentId);
            const assignment = assignmentsData.find(a => a.id === submission.assignmentId);
            return (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SubmissionCard 
                  submission={submission}
                  studentName={student?.name || 'Unknown'}
                  assignmentTitle={assignment?.title || 'Unknown Assignment'}
                />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Submissions;
