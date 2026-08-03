import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, BookOpen, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ScoreCard from '../../components/students/ScoreCard';
import { studentsData } from '../../data/students';
import { submissionsData } from '../../data/submissions';
import { assignmentsData } from '../../data/assignments';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  
  useEffect(() => {
    const found = studentsData.find(s => s.id === parseInt(id));
    if (found) setStudent(found);
    else navigate('/students');
  }, [id, navigate]);

  if (!student) return <div className="p-8 text-center">Loading...</div>;

  // Filter submissions for this specific student
  const studentSubmissions = submissionsData.filter(s => s.studentId === student.id);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <Link 
          to="/students" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={18} />
          Back to Students
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              {getInitials(student.name)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-secondary">{student.name}</h1>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                  student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {student.status}
                </span>
              </div>
              <p className="text-gray-500 font-mono font-medium">{student.rollNo}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreCard 
              title="Average Score" 
              score={student.averageScore} 
              subtitle="Class Rank: #3"
              colorClass="text-blue-600 bg-blue-100"
            />
            <ScoreCard 
              title="Problems Solved" 
              score={student.problemsSolved} 
              maxScore={60} 
              colorClass="text-green-600 bg-green-100"
            />
          </div>

          {/* Assignment History Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Assignment History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-medium">
                    <th className="py-4 px-6 font-medium">Assignment</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium">Score</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentSubmissions.map(sub => {
                    const assignment = assignmentsData.find(a => a.id === sub.assignmentId);
                    return (
                      <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-4 px-6 font-medium text-gray-900">{assignment?.title || 'Unknown Assignment'}</td>
                        <td className="py-4 px-6 text-gray-500">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                        <td className="py-4 px-6 font-semibold">{sub.score}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                            sub.status === 'Passed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {studentSubmissions.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No submissions recorded for this student.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Profile Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Profile Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1"><Mail size={16} /> Email Address</p>
                <p className="font-semibold text-gray-900">{student.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1"><BookOpen size={16} /> Enrolled Course</p>
                <p className="font-semibold text-gray-900">{student.course}</p>
              </div>
            </div>
          </motion.div>

          {/* Weak Topics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-primary" /> Weak Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.weakTopics && student.weakTopics.length > 0 ? (
                student.weakTopics.map(topic => (
                  <span key={topic} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 font-medium rounded-lg text-sm">
                    {topic}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 italic text-sm">No weak topics identified yet.</span>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
