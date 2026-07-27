import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Bell, 
  Bot, 
  User, 
  LogOut, 
  CheckCircle2, 
  BookOpen, 
  Trophy,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { studentProfile, notificationsData } from '../data/mockData';

export default function Navbar({ activeTab, setActiveTab, toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.85rem 2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--card-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & Mobile Hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button 
          onClick={toggleSidebar} 
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem' }}
          title="Toggle Navigation Menu"
        >
          ☰
        </button>

        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(242, 100, 34, 0.3)'
          }}>
            <Code2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--dark-heading)', lineHeight: 1.1 }}>
              Tech<span style={{ color: 'var(--primary-orange)' }}>Quotient</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>
              UNIFIED ACADEMIC HUB
            </div>
          </div>
        </div>

        <span className="badge badge-orange" style={{ marginLeft: '0.5rem' }}>
          Student Portal
        </span>
      </div>

      {/* Center Search Bar */}
      <div style={{ flex: 1, maxWidth: '480px', margin: '0 1.5rem', position: 'relative' }}>
        <Search size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search problems, assignments, courses or topics... (Ctrl+K)" 
          className="input-field"
          style={{ paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)', backgroundColor: '#f1f5f9' }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Quick AI Mentor Launch */}
        <button 
          onClick={() => setActiveTab('ai-assistant')} 
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Sparkles size={16} color="var(--primary-orange)" />
          <span>Ask TechBot</span>
        </button>

        {/* Notifications Popover Trigger */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--card-border)',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} color="var(--text-main)" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '10px',
                height: '10px',
                backgroundColor: 'var(--primary-orange)',
                borderRadius: '50%',
                border: '2px solid white'
              }}></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50px',
              width: '360px',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-hover)',
              border: '1px solid var(--card-border)',
              padding: '1rem',
              zIndex: 1000
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ fontSize: '0.775rem', color: 'var(--primary-orange)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Mark all read
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: n.unread ? 'var(--lighter-orange)' : '#f8fafc',
                    borderLeft: n.unread ? '3px solid var(--primary-orange)' : '1px solid var(--card-border)'
                  }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--dark-heading)' }}>{n.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.message}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', textAlign: 'right' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)' }}
          >
            <img 
              src={studentProfile.avatar} 
              alt={studentProfile.name} 
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-orange)' }}
            />
            <div style={{ textAlign: 'left', display: 'none', '@media (minWidth: 768px)': { display: 'block' } }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--dark-heading)' }}>{studentProfile.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Roll: {studentProfile.rollNo}</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>

          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '50px',
              width: '220px',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-hover)',
              border: '1px solid var(--card-border)',
              padding: '0.5rem',
              zIndex: 1000
            }}>
              <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--card-border)', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{studentProfile.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{studentProfile.email}</div>
              </div>
              <button 
                onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)', textAlign: 'left', fontSize: '0.85rem' }}
              >
                <User size={16} /> My Profile & Badges
              </button>
              <button 
                onClick={() => { setActiveTab('courses'); setShowProfileMenu(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)', textAlign: 'left', fontSize: '0.85rem' }}
              >
                <BookOpen size={16} /> Enrolled Courses
              </button>
              <div style={{ borderTop: '1px solid var(--card-border)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <button 
                  onClick={() => alert("TechQuotient Auth session reset.")}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)', textAlign: 'left', fontSize: '0.85rem', color: 'var(--danger)' }}
                >
                  <LogOut size={16} /> Logout Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
