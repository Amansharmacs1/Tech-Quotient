import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  Brain, 
  Award, 
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function Analytics() {
  // Generate simulated 28-day GitHub style activity heatmap
  const activityMatrix = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    count: Math.floor(Math.random() * 6) + (i % 3 === 0 ? 2 : 0)
  }));

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
          Performance Analytics & Skill Matrix
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Comprehensive evaluation of your coding velocity, topic accuracy, and problem difficulty distribution.
        </p>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div className="grid-3">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--lighter-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={30} color="var(--primary-orange)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>CURRENT STREAK</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark-heading)' }}>{studentProfile.streakDays} Days</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Top 5% in CSE 2024 Batch</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={30} color="var(--success)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROBLEMS SOLVED</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark-heading)' }}>142 / 250</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>56.8% Completion Rate</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={30} color="#d97706" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>GLOBAL RANK</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark-heading)' }}>#{studentProfile.rank}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-orange)', fontWeight: 700 }}>2450 Rating Points</div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap Grid Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Coding Velocity Heatmap (July 2026)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Daily submissions recorded by Judge0 engine</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Less</span>
            {[0, 1, 3, 5].map(lvl => (
              <div key={lvl} style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: lvl === 0 ? '#f1f5f9' : lvl === 1 ? '#fed7aa' : lvl === 3 ? '#fb923c' : 'var(--primary-orange)'
              }} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* 28-day Squares Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
          {activityMatrix.map(item => {
            const bg = item.count === 0 ? '#f1f5f9' : item.count < 3 ? '#fed7aa' : item.count < 5 ? '#fb923c' : 'var(--primary-orange)';
            return (
              <div
                key={item.day}
                title={`Day ${item.day}: ${item.count} submissions`}
                style={{
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.count > 2 ? 'white' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty & Skill Matrix Grid */}
      <div className="grid-2">
        
        {/* Difficulty Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Difficulty Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: 'var(--success)' }}>Easy Problems</span>
                <span>82 / 90 Solved</span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '91%', height: '100%', backgroundColor: 'var(--success)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: 'var(--warning)' }}>Medium Problems</span>
                <span>48 / 110 Solved</span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '43.6%', height: '100%', backgroundColor: 'var(--warning)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: 'var(--danger)' }}>Hard Problems</span>
                <span>12 / 50 Solved</span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '24%', height: '100%', backgroundColor: 'var(--danger)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Report */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #fdf2ed 0%, #ffffff 100%)', border: '1px solid var(--light-orange)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={20} color="var(--primary-orange)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>TechBot AI Skill Diagnostic</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'white', border: '1px solid var(--card-border)' }}>
              <strong style={{ color: 'var(--success)' }}>💪 Strongest Domain:</strong> Arrays, Hashing & String Manipulation (94% accuracy).
            </div>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'white', border: '1px solid var(--card-border)' }}>
              <strong style={{ color: 'var(--warning)' }}>⚡ Growth Opportunity:</strong> Dynamic Programming & Tree Rotations (62% accuracy).
            </div>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'white', border: '1px solid var(--card-border)' }}>
              <strong style={{ color: 'var(--primary-orange)' }}>🎯 Recommended Plan:</strong> Solve 3 medium DP problems this week to achieve rank top 10.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
