import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  FileText, 
  Trophy, 
  BarChart3, 
  Bell, 
  Settings,
  Bot
} from 'lucide-react';

export default function Sidebar({ role = 'student', activeTab, setActiveTab }) {
  const isFaculty = role === 'faculty';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'coding-workspace', label: 'Coding Problems', icon: Code2 },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'contests', label: 'Contests', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Announcements', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{ padding: '1.5rem 1.25rem 1.25rem 1.25rem' }}>
        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
            Tech<span style={{ color: 'var(--primary-orange)' }}>Quotient</span>
          </div>
          <div style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.8px', marginTop: '3px', textTransform: 'uppercase' }}>
            {isFaculty ? 'FACULTY PORTAL' : 'STUDENT PORTAL'}
          </div>
        </div>
      </div>

      {/* Navigation Links List */}
      <nav style={{ padding: '0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: isActive ? '#ffedd5' : 'transparent',
                color: isActive ? 'var(--primary-orange)' : 'var(--text-main)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--primary-orange)' : 'var(--text-muted)'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Banner */}
      <div style={{ padding: '1rem 0.85rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '10px', 
          backgroundColor: '#fff7ed', 
          border: '1px solid #fed7aa',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Bot size={20} color="var(--primary-orange)" />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>TechBot AI</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {isFaculty ? 'Auto-grading active' : '14 Day Streak 🔥'}
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
