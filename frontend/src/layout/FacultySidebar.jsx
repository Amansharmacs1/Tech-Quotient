import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Code2, 
  FileText, 
  LineChart, 
  Bell, 
  Settings, 
  Users, 
  Inbox, 
  FileBarChart, 
  Sparkles,
  Bot
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/faculty/dashboard', icon: Home },
  { name: 'Courses', path: '/faculty/courses', icon: BookOpen },
  { name: 'Coding Problems', path: '/faculty/problems', icon: Code2 },
  { name: 'Assignments', path: '/faculty/assignments', icon: FileText },
  { name: 'Students', path: '/faculty/students', icon: Users },
  { name: 'Submissions', path: '/faculty/submissions', icon: Inbox },
  { name: 'Analytics', path: '/faculty/analytics', icon: LineChart },
  { name: 'Reports', path: '/faculty/reports', icon: FileBarChart },
  { name: 'AI Assistant', path: '/faculty/ai', icon: Sparkles },
  { name: 'Announcements', path: '/faculty/announcements', icon: Bell },
  { name: 'Settings', path: '/faculty/settings', icon: Settings },
];

export default function FacultySidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-100 shadow-sm flex flex-col z-20">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-50">
        <NavLink to="/faculty/dashboard" className="block text-decoration-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">
              TQ
            </div>
            <h1 className="text-xl font-black text-secondary tracking-tight">
              Tech<span className="text-primary">Quotient</span>
            </h1>
          </div>
          <p className="text-[10px] text-gray-400 font-bold tracking-wider mt-1.5 uppercase">
            Faculty Academic Portal
          </p>
        </NavLink>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold ${
                isActive
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-orange-50 hover:text-primary'
              }`
            }
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Card */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/60">
        <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-3">
          <Bot className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-gray-800">Teaching Assistant</div>
            <div className="text-[11px] text-gray-500 truncate">Gemini AI grading active</div>
          </div>
        </div>
      </div>

    </aside>
  );
}
