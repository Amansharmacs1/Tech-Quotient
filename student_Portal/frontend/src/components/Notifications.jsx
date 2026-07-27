import React, { useState } from 'react';
import { Bell, CheckCircle2, FileText, Sparkles, Trophy, Filter } from 'lucide-react';
import { notificationsData } from '../data/mockData';

export default function Notifications() {
  const [list, setList] = useState(notificationsData);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? list 
    : list.filter(item => item.type === filter);

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
            Notifications & Announcements Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time updates on assignments, contest alerts, and AI recommendations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'white', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--card-border)' }}>
          {['all', 'assignment', 'ai', 'contest'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.45rem 0.9rem',
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

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(item => (
          <div key={item.id} style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: item.unread ? 'var(--lighter-orange)' : '#f8fafc',
            borderLeft: item.unread ? '4px solid var(--primary-orange)' : '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
