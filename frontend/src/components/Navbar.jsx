import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  UserCircle2, 
  ChevronDown, 
  GraduationCap, 
  UserCheck
} from 'lucide-react';
import { facultyInfo, studentInfo, notificationsData } from '../data/mockData';

export default function Navbar({ role = 'student', setRole, activeTab, setActiveTab }) {
  const isFaculty = role === 'faculty';
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData || [
    { id: 1, title: "New Assignment Posted", message: "CSE201 Assignment 4 is now live.", time: "10m ago", unread: true },
    { id: 2, title: "Judge0 Testcases Passed", message: "Solution for Two Sum Target Pair accepted.", time: "1h ago", unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="top-navbar">
      {/* Page Title */}
      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)' }}>
        {isFaculty ? 'Faculty Dashboard' : 'Student Dashboard'}
      </div>

      {/* Center Search Input (Matching Screenshot) */}
      <div className="search-input-wrapper">
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search courses, problems..." 
        />
      </div>

      {/* Right Tools & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* Role Switcher Pill Toggle Button */}
        <button 
          onClick={() => setRole(isFaculty ? 'student' : 'faculty')}
          className="role-toggle-btn"
          title="Click to toggle between Student and Faculty portal views"
        >
          {isFaculty ? (
            <>
              <GraduationCap size={16} /> Switch to Student View
            </>
          ) : (
            <>
              <UserCheck size={16} /> Switch to Faculty View
            </>
          )}
        </button>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={20} color="var(--text-muted)" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--primary-orange)',
                borderRadius: '50%'
              }} />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '320px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid var(--border-color)',
              padding: '1rem',
              zIndex: 1000
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>Notifications</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-orange)', cursor: 'pointer' }} onClick={() => setNotifications([])}>Clear</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ fontSize: '0.8rem', padding: '0.5rem', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    <div style={{ fontWeight: 700 }}>{n.title}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Pill (Matching Screenshot: initials in orange circle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#ffedd5',
            color: 'var(--primary-orange)',
            fontWeight: 800,
            fontSize: '0.825rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #fed7aa'
          }}>
            {isFaculty ? 'PD' : 'AG'}
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {isFaculty ? facultyInfo.name : studentInfo.name}
          </span>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>

      </div>
    </header>
  );
}
