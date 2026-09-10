import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut, RefreshCw, GraduationCap, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ portalType = 'faculty' }) {
  const navigate = useNavigate();
  const { user, role, switchRole, logout } = useAuth();
  const isFaculty = portalType === 'faculty' || role === 'faculty';

  const handleRoleToggle = () => {
    const target = isFaculty ? 'student' : 'faculty';
    switchRole(target);
    navigate(target === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const avatarUrl = user?.avatar || (isFaculty
    ? 'https://ui-avatars.com/api/?name=Professor+Doe&background=FFF1E8&color=F26422'
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  const displayName = user?.name || (isFaculty ? 'Prof. Doe' : 'Ansh Goyal');

  return (
    <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      
      {/* Portal Indicator */}
      <div className="flex-1 flex items-center gap-3">
        <h2 className="text-xl font-bold text-secondary">
          {isFaculty ? 'Faculty Portal' : 'Student Portal'}
        </h2>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
          isFaculty ? 'bg-orange-100 text-primary' : 'bg-blue-100 text-blue-700'
        }`}>
          {isFaculty ? 'Instructor View' : 'Student View'}
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full leading-5 bg-background placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition duration-150 ease-in-out text-sm"
            placeholder={isFaculty ? "Search courses, problems, students..." : "Search problems, assignments, topics..."}
          />
        </div>
      </div>

      {/* Right Controls & User Menu */}
      <div className="flex-1 flex items-center justify-end space-x-4">
        
        {/* Instant Role Switcher Button for Evaluation */}
        <button
          onClick={handleRoleToggle}
          title={`Click to switch to ${isFaculty ? 'Student' : 'Faculty'} view`}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <RefreshCw size={13} />
          <span>Switch to {isFaculty ? 'Student' : 'Faculty'}</span>
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => navigate(isFaculty ? '/faculty/announcements' : '/student/notifications')}
          className="text-gray-400 hover:text-primary transition-colors relative p-1.5"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary ring-2 ring-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
          <img
            className="h-9 w-9 rounded-full object-cover border-2 border-primary/20"
            src={avatarUrl}
            alt="Profile"
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName) + '&background=FFF1E8&color=F26422';
            }}
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-secondary leading-tight">{displayName}</p>
            <p className="text-xs text-gray-400">{isFaculty ? 'CSE Faculty' : 'Roll: 2411981092'}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
          >
            <LogOut size={17} />
          </button>
        </div>

      </div>

    </header>
  );
}
