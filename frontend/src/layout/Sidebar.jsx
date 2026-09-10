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
  Sparkles
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'Coding Problems', path: '/problems', icon: Code2 },
  { name: 'Assignments', path: '/assignments', icon: FileText },
  { name: 'Students', path: '/students', icon: Users },
  { name: 'Submissions', path: '/submissions', icon: Inbox },
  { name: 'Analytics', path: '/analytics', icon: LineChart },
  { name: 'Reports', path: '/reports', icon: FileBarChart },
  { name: 'AI Assistant', path: '/ai', icon: Sparkles },
  { name: 'Announcements', path: '/announcements', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white shadow-sm flex flex-col z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-secondary">
          Tech<span className="text-primary">Quotient</span>
        </h1>
        <p className="text-xs text-gray-500 font-medium tracking-wide mt-1">
          FACULTY PORTAL
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? 'bg-gradient-primary shadow-md'
                  : 'text-gray-600 hover:bg-accent hover:text-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
