import React from 'react';
import { Sparkles, Code2, FileText, LineChart, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIToolCard = ({ title, description, icon: Icon, path, colorClass }) => (
  <Link to={path} className="group block h-full">
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all h-full flex flex-col">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colorClass}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>
    </div>
  </Link>
);

const AIHome = () => {
  const tools = [
    {
      title: 'AI Problem Generator',
      description: 'Generate high-quality coding problems with test cases, constraints, and solutions instantly.',
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
      title: 'AI Chat Assistant',
      description: 'Conversational assistant to help you brainstorm ideas, draft emails, or analyze data.',
      icon: MessageSquare,
      path: '/ai/assistant',
      colorClass: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'AI History',
      description: 'Access previously generated problems, assignments, and saved AI insights.',
      icon: Clock,
      path: '/ai/history',
      colorClass: 'bg-gray-100 text-gray-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 mb-10 border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles size={200} className="text-primary" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI Teaching Assistant</h1>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Use Artificial Intelligence to create coding content, analyze student performance, and improve classroom learning. Select a tool below to get started.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick AI Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <AIToolCard key={tool.title} {...tool} />
        ))}
      </div>
      
    </div>
  );
};

export default AIHome;
