import React from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  GraduationCap, 
  Award, 
  Flame, 
  ShieldCheck, 
  Code2, 
  Sparkles,
  Edit3
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function Profile() {
  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <img
          src={studentProfile.avatar}
          alt={studentProfile.name}
          style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-orange)', boxShadow: '0 8px 25px rgba(242, 100, 34, 0.4)' }}
        />

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800 }}>{studentProfile.name}</h1>
            <span className="badge badge-orange">Batch {studentProfile.batch}</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <span><GraduationCap size={16} style={{ display: 'inline', marginRight: '4px' }} /> Roll No: {studentProfile.rollNo}</span>
            <span><Building2 size={16} style={{ display: 'inline', marginRight: '4px' }} /> {studentProfile.department}</span>
            <span><Mail size={16} style={{ display: 'inline', marginRight: '4px' }} /> {studentProfile.email}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '0.75rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-orange)' }}>#{studentProfile.rank}</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>GLOBAL RANK</div>
          </div>
          <div style={{ textAlign: 'center', padding: '0.75rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f97316' }}>{studentProfile.streakDays}d</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>STREAK</div>
          </div>
        </div>
      </div>

      {/* Badges & Skill Matrix Grid */}
      <div className="grid-2">
        
        {/* Badges & Achievements */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Earned Badges & Micro-Credentials</h3>
          <div className="grid-2">
            {studentProfile.badges.map((b, idx) => (
              <div key={idx} style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--card-border)',
                backgroundColor: '#f8fafc',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--dark-heading)' }}>{b.title}</h4>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '4px' }}>{b.desc}</p>
                <span className="badge badge-orange" style={{ fontSize: '0.675rem', marginTop: '0.5rem' }}>Issued: {b.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Profile Details */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Academic Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>University:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>{studentProfile.institution}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Degree Program:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>B.E. Computer Science & Engineering</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Batch Cohort:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>2024 - 2028</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Project Mentor:</span>
              <strong style={{ color: 'var(--primary-orange)' }}>Dr. Sandeep Rana</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Coding Submissions:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>482 Runs</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
