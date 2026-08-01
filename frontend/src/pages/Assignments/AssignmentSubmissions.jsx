import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, XCircle, Search, Eye } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { globalAssignments } from './Assignments';

// Dummy data for submissions (simulating an API call based on assignment ID)
const dummySubmissions = [
  { id: 1, student: "Aman Sharma", submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), score: 92, status: "Completed" },
  { id: 2, student: "Rahul Verma", submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), score: 76, status: "Completed" },
  { id: 3, student: "Priya Singh", submittedAt: null, score: null, status: "Pending" },
  { id: 4, student: "Amit Kumar", submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), score: 45, status: "Failed" },
  { id: 5, student: "Neha Gupta", submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), score: 100, status: "Completed" },
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Completed': return <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-md"><CheckCircle2 size={14} /> Completed</span>;
    case 'Pending': return <span className="flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-md"><Clock size={14} /> Pending</span>;
    case 'Failed': return <span className="flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-1 rounded-md"><XCircle size={14} /> Failed</span>;
    default: return null;
  }
};

const AssignmentSubmissions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const foundAssignment = globalAssignments.find(a => a.id === parseInt(id));
    if (foundAssignment) {
      setAssignment(foundAssignment);
    } else {
      navigate('/assignments');
    }
  }, [id, navigate]);

  if (!assignment) return <div className="p-8 text-center">Loading...</div>;

  const filteredSubmissions = dummySubmissions.filter(sub => 
    sub.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <Link 
          to={`/assignments/${id}`} 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={18} />
          Back to Assignment Details
        </Link>
        <h1 className="text-3xl font-bold text-secondary mb-2">Submissions: {assignment.title}</h1>
        <p className="text-gray-500">View and evaluate student submissions for this assignment.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-gray-800">Student List</h3>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm font-medium">
                <th className="py-4 px-6 font-medium">Student Name</th>
                <th className="py-4 px-6 font-medium">Submitted At</th>
                <th className="py-4 px-6 font-medium">Score</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((sub, index) => (
                <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {sub.student.charAt(0)}
                    </div>
                    {sub.student}
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '-'}
                  </td>
                  <td className="py-4 px-6">
                    {sub.score !== null ? (
                      <span className="font-semibold text-gray-900">{sub.score} / {assignment.maxMarks}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(sub.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      disabled={sub.status === 'Pending'}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        sub.status === 'Pending' 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white border border-gray-200 text-primary hover:bg-gray-50'
                      }`}
                    >
                      <Eye size={16} /> View Result
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AssignmentSubmissions;
