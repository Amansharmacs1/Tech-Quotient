import React from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  FileText, 
  Trophy, 
  Bot, 
  BarChart3, 
  BookOpen, 
  Bell, 
  UserCircle2,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function Sidebar({ activeTab, setActiveTab, isOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'coding-workspace', label: 'Coding Practice', icon: Code2, badge: 'Judge0' },
    { id: 'assignments', label: 'Assignments', icon: FileText, count: 3 },
    { id: 'contests', label: 'Coding Contests', icon: Trophy, live: true },
    { id: 'ai-assistant', label: 'AI Mentor Studio', icon: Bot, isAi: true },
    { id: 'analytics', label: 'Analytics & Heatmap', icon: BarChart3 },
    { id: 'courses', label: 'Enrolled Courses', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Student Profile', icon: UserCircle2 }
  ];

  return (
    <aside style={{
      width: isOpen ? '260px' : '80px',
      backgroundColor: 'white',
      borderRight: '1px solid var(--card-border)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 90,
      minHeight: 'calc(100vh - 65px)',
      position: 'sticky',
      top: '65px'
    }}>
      {/* Menu List */}
      <div style={{ padding: '1.25rem 0.75rem' }}>
        <div style={{
          fontSize: '0.725rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          padding: '0 0.75rem 0.75rem 0.75rem',
          display: isOpen ? 'block' : 'none'
        }}>
          STUDENT NAVIGATION
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
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
                  padding: '0.75rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isActive 
                    ? 'var(--lighter-orange)' 
                    : 'transparent',
                  color: isActive 
                    ? 'var(--primary-orange)' 
                    : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                title={!isOpen ? item.label : ''}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: '4px',
                    backgroundColor: 'var(--primary-orange)',
                    borderRadius: '0 4px 4px 0'
                  }} />
                )}

                <Icon size={20} color={isActive ? 'var(--primary-orange)' : (item.isAi ? '#8b5cf6' : 'var(--text-muted)')} />
                
                {isOpen && (
                  <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                )}

                {isOpen && item.live && (
                  <span className="badge badge-danger" style={{ fontSize: '0.675rem', padding: '0.15rem 0.45rem' }}>
                    LIVE
                  </span>
                )}

                {isOpen && item.count && (
                  <span className="badge badge-orange" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                    {item.count}
                  </span>
                )}

                {isOpen && item.isAi && (
                  <Sparkles size={14} color="#8b5cf6" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: Student Streak Stats */}
      {isOpen && (
        <div style={{ padding: '1rem', borderTop: '1px solid var(--card-border)', backgroundColor: '#fafafa' }}>
          <div className="card" style={{ padding: '1rem', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame size={20} color="#f97316" className="pulse-glow" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{studentProfile.streakDays} Day Streak!</span>
              </div>
              <Award size={18} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
              Solve 1 problem today to keep your rank #{studentProfile.rank} safe.
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
