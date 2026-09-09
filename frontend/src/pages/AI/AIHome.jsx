import React from 'react';
import { Sparkles, Code2, FileText, LineChart, MessageSquare, Clock, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIToolCard = ({ title, description, icon: Icon, path, colorClass }) => (
  <Link to={path} className="group block h-full">
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all h-full flex flex-col">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colorClass}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{description}</p>
      <div className="flex items-center text-primary text-sm font-bold gap-1 group-hover:gap-2 transition-all mt-auto">
        Open Tool <ArrowRight size={16} />
      </div>
    </div>
  </Link>
);

const AIHome = () => {
  const tools = [
    {
      title: 'AI Problem Generator',
      description: 'Generate structured programming problems based on topic and difficulty.',
      icon: Code2,
      path: '/ai/problem-generator',
      colorClass: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'AI Assignment Generator',
      description: 'Create complete, balanced assignments mapped to your course learning objectives.',
      icon: FileText,
      path: '/ai/assignment-generator',
      colorClass: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Student Insights',
      description: 'Get AI-driven analysis on class performance, weak topics, and actionable teaching recommendations.',
      icon: LineChart,
      path: '/ai/student-insights',
      colorClass: 'bg-green-100 text-green-600'
    },
    {
      title: 'AI Teaching Assistant',
      description: 'Conversational assistant to help you brainstorm ideas, draft emails, or analyze data.',
      icon: MessageSquare,
      path: '/ai/assistant',
      colorClass: 'bg-orange-100 text-orange-600'
    }
  ];

  const quickActions = [
    "Generate Array Problem",
    "Analyze Class Performance",
    "Create DSA Assignment",
    "Find Weak Topics",
    "Suggest Practice Problems"
  ];

  const recentActivity = [
    { title: 'Generated "Binary Tree Paths"', time: '2 hours ago', icon: Code2, color: 'text-blue-500 bg-blue-50' },
    { title: 'Analyzed DSA Semester 5', time: 'Yesterday', icon: LineChart, color: 'text-green-500 bg-green-50' },
    { title: 'Generated "Graph Practice Assignment"', time: '2 days ago', icon: FileText, color: 'text-purple-500 bg-purple-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-10">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 border border-primary/10 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Sparkles size={200} className="text-primary" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-white border border-primary/20 text-primary text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
              <Sparkles size={12} /> Powered by AI
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">AI Teaching Assistant</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            Create smarter coding content, understand student performance, and get intelligent teaching recommendations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Tools (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Zap size={20} className="text-primary" /> Main AI Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tools.map(tool => (
                <AIToolCard key={tool.title} {...tool} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" /> Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              {quickActions.map(action => (
                <button key={action} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm shadow-sm">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (1 Column) */}
        <div className="space-y-6">
          
          {/* Usage Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <LineChart size={18} className="text-green-500" /> AI Usage Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Problems Generated</span>
                <span className="font-bold text-gray-900">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Assignments Generated</span>
                <span className="font-bold text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Insights Created</span>
                <span className="font-bold text-gray-900">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">AI Conversations</span>
                <span className="font-bold text-gray-900">156</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock size={18} className="text-purple-500" /> Recent AI Activity
              </h3>
              <Link to="/ai/history" className="text-xs font-bold text-primary hover:underline">View All</Link>
            </div>
            
            <div className="space-y-5">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activity.color}`}>
                    <activity.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default AIHome;
