import React, { useState } from 'react';
import { Bell, CheckCircle2, FileText, Sparkles, Trophy, Filter, Check, Trash2 } from 'lucide-react';
import { notificationsData as initialNotifications } from '../data/mockData';

export default function Notifications({ setActiveTab }) {
  const [list, setList] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? list 
    : list.filter(item => item.type === filter);

  const handleMarkAllRead = () => {
    setList(prev => prev.map(item => ({ ...item, unread: false })));
  };

  const handleClearNotification = (id) => {
    setList(prev => prev.filter(item => item.id !== id));
  };

  const handleItemClick = (item) => {
    // Mark as read
    setList(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
    
    // Navigate based on type
    if (setActiveTab) {
      if (item.type === 'assignment') setActiveTab('assignments');
      else if (item.type === 'contest') setActiveTab('contests');
      else if (item.type === 'ai') setActiveTab('coding-workspace');
    }
  };

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
            Notifications & Announcements Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time updates on assignments, contest alerts, and AI mentor recommendations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={handleMarkAllRead} className="btn btn-light btn-sm">
            <Check size={14} /> Mark All as Read
          </button>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'white', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--card-border)' }}>
            {['all', 'assignment', 'ai', 'contest'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: filter === cat ? 'var(--primary-orange)' : 'transparent',
                  color: filter === cat ? 'white' : 'var(--text-muted)',
                  fontWeight: filter === cat ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Bell size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <div>No notifications found in this category.</div>
          </div>
        ) : (
          filtered.map(item => (
            <div 
              key={item.id} 
              onClick={() => handleItemClick(item)}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: item.unread ? 'var(--lighter-orange)' : '#f8fafc',
                borderLeft: item.unread ? '4px solid var(--primary-orange)' : '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-subtle)',
                flexShrink: 0
              }}>
                {item.type === 'assignment' && <FileText size={20} color="var(--primary-orange)" />}
                {item.type === 'ai' && <Sparkles size={20} color="#8b5cf6" />}
                {item.type === 'contest' && <Trophy size={20} color="#d97706" />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--dark-heading)' }}>{item.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '4px' }}>{item.message}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearNotification(item.id);
                }}
                title="Dismiss"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.6 }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
