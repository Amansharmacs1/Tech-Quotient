import React, { useState } from 'react';
import { 
  BarChart3, 
  Flame, 
  Award, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Target, 
  TrendingUp,
  Code2
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function Analytics({ role = 'student' }) {
  const [timeframe, setTimeframe] = useState('30d'); // '7d' | '30d' | 'all'

  // Timeframe modifiers
  const multiplier = timeframe === '7d' ? 0.35 : timeframe === '30d' ? 1.0 : 2.4;

  const stats = {
    solved: Math.round(142 * multiplier),
    accuracy: timeframe === '7d' ? '92.4%' : timeframe === '30d' ? '88.5%' : '85.1%',
    rank: studentProfile.rank,
    streak: studentProfile.streakDays,
    easy: Math.round(75 * multiplier),
    medium: Math.round(52 * multiplier),
    hard: Math.round(15 * multiplier)
  };

  const skills = [
    { name: 'Data Structures & Trees', level: 92, color: 'var(--primary-orange)' },
    { name: 'Algorithms & Sorting', level: 85, color: '#3b82f6' },
    { name: 'Full Stack Web Dev (React & Node)', level: 88, color: '#10b981' },
    { name: 'Object-Oriented Programming (Java)', level: 95, color: '#8b5cf6' },
    { name: 'Dynamic Programming', level: 68, color: '#f59e0b' }
  ];

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
            Personalized Learning & Skill Analytics
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Comprehensive report on coding velocity, accuracy rate, and topic mastery.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'white', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--card-border)' }}>
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'all', label: 'All Time' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: timeframe === t.id ? 'var(--primary-orange)' : 'transparent',
                color: timeframe === t.id ? 'white' : 'var(--text-muted)',
                fontWeight: timeframe === t.id ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="stat-card-grid">
        <div className="stat-card">
          <div>
            <div className="stat-label">Problems Solved</div>
            <div className="stat-value">{stats.solved}</div>
            <div className="stat-subtext positive">+{Math.round(12 * multiplier)} in selected period</div>
          </div>
          <div className="stat-icon-bubble">
            <Code2 size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Overall Accuracy</div>
            <div className="stat-value">{stats.accuracy}</div>
            <div className="stat-subtext positive">Top 5% Cohort</div>
          </div>
          <div className="stat-icon-bubble">
            <Target size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Global Leaderboard</div>
            <div className="stat-value">#{stats.rank}</div>
            <div className="stat-subtext neutral">Chitkara CSE 2024</div>
          </div>
          <div className="stat-icon-bubble">
            <Award size={20} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Active Coding Streak</div>
            <div className="stat-value">{stats.streak}d</div>
            <div className="stat-subtext positive" style={{ color: '#d97706' }}>Streak Master 🔥</div>
          </div>
          <div className="stat-icon-bubble">
            <Flame size={20} />
          </div>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid-2">
        
        {/* Problem Difficulty Distribution */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Difficulty Breakdown ({timeframe.toUpperCase()})</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                <span style={{ color: '#16a34a' }}>Easy Problems</span>
                <span>{stats.easy} Solved</span>
              </div>
              <div className="progress-bar-track" style={{ height: '8px' }}>
                <div className="progress-bar-fill" style={{ width: '65%', backgroundColor: '#16a34a' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                <span style={{ color: '#d97706' }}>Medium Problems</span>
                <span>{stats.medium} Solved</span>
              </div>
              <div className="progress-bar-track" style={{ height: '8px' }}>
                <div className="progress-bar-fill" style={{ width: '45%', backgroundColor: '#d97706' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                <span style={{ color: '#dc2626' }}>Hard Problems</span>
                <span>{stats.hard} Solved</span>
              </div>
              <div className="progress-bar-track" style={{ height: '8px' }}>
                <div className="progress-bar-fill" style={{ width: '25%', backgroundColor: '#dc2626' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Topic Mastery & Skill Index</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {skills.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span>{skill.name}</span>
                  <span style={{ color: skill.color }}>{skill.level}%</span>
                </div>
                <div className="progress-bar-track" style={{ height: '6px' }}>
                  <div className="progress-bar-fill" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
