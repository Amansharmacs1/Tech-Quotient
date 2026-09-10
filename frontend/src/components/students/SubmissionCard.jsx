import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  switch(status) {
    case 'Passed': return 'text-green-600 bg-green-50 border-green-200';
    case 'Failed': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getStatusIcon = (status) => {
  switch(status) {
    case 'Passed': return <CheckCircle2 size={16} className="text-green-600" />;
    case 'Failed': return <XCircle size={16} className="text-red-600" />;
    default: return <Clock size={16} className="text-gray-600" />;
  }
};

const SubmissionCard = ({ submission, studentName, assignmentTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
      className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div className="flex items-start gap-4 flex-1">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 mt-1">
          {studentName.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900">{studentName}</h4>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border flex items-center gap-1 ${getStatusColor(submission.status)}`}>
              {getStatusIcon(submission.status)}
              {submission.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-medium">{assignmentTitle}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Code2 size={14} /> {submission.language}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {new Date(submission.submittedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 md:border-l md:border-gray-100 md:pl-6 pt-4 md:pt-0 border-t border-gray-50 mt-2 md:mt-0">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Score</p>
          <p className={`text-xl font-bold ${submission.score >= 50 ? 'text-green-600' : 'text-red-600'}`}>
            {submission.score}
          </p>
        </div>
        
        <Link
          to={`/submissions/${submission.id}`}
          className="px-4 py-2 bg-gray-50 hover:bg-primary/10 text-gray-700 hover:text-primary font-medium rounded-lg transition-colors flex items-center gap-1 text-sm border border-gray-200 hover:border-primary/30"
        >
          Review <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default SubmissionCard;
