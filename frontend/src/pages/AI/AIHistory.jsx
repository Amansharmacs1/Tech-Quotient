import React from 'react';
import { ArrowLeft, Clock, Search, Filter, Code2, FileText, LineChart, MessageSquare, MoreVertical, Eye, RefreshCw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIHistory = () => {
  const historyData = [
    { type: 'Problem', title: 'Binary Tree Paths', date: '2023-10-25', course: 'Data Structures', status: 'Saved', icon: Code2, color: 'text-blue-500 bg-blue-50' },
    { type: 'Assignment', title: 'Graph Practice Assignment', date: '2023-10-23', course: 'Algorithms', status: 'Published', icon: FileText, color: 'text-purple-500 bg-purple-50' },
    { type: 'Insight', title: 'DSA Semester 5 Performance', date: '2023-10-21', course: 'Data Structures', status: 'Reviewed', icon: LineChart, color: 'text-green-500 bg-green-50' },
    { type: 'Chat', title: 'Discussion on DP optimization', date: '2023-10-20', course: 'Algorithms', status: 'Archived', icon: MessageSquare, color: 'text-orange-500 bg-orange-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
            <ArrowLeft size={18} /> Back to AI Hub
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Clock className="text-primary" size={32} /> AI Generation History
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Access your previously generated problems, assignments, and insights.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-2 focus:ring-0 cursor-pointer hidden sm:block">
            <option>All Types</option>
            <option>Problems</option>
            <option>Assignments</option>
            <option>Insights</option>
            <option>Chats</option>
          </select>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm w-48"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-primary bg-gray-50 rounded-lg">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {historyData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      <item.icon size={16} />
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-900">{item.title}</td>
                  <td className="p-4 text-sm text-gray-600">{item.course}</td>
                  <td className="p-4 text-sm text-gray-600">{item.date}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors" title="View"><Eye size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-md transition-colors" title="Reuse"><RefreshCw size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIHistory;
