import React, { useState } from 'react';
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
  Edit3,
  Check,
  X
} from 'lucide-react';
import { studentProfile as initialProfile } from '../../data/mockData';

export default function Profile({ role = 'student', onUpdateProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    department: profile.department,
    institution: profile.institution,
    batch: profile.batch,
    avatar: profile.avatar
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(prev => ({ ...prev, ...editForm }));
    if (onUpdateProfile) onUpdateProfile(editForm);
    setShowEditModal(false);
  };

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
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        <img
          src={profile.avatar}
          alt={profile.name}
          style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-orange)', boxShadow: '0 8px 25px rgba(242, 100, 34, 0.4)' }}
        />

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800 }}>{profile.name}</h1>
            <span className="badge badge-orange">Batch {profile.batch}</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <span><GraduationCap size={16} style={{ display: 'inline', marginRight: '4px' }} /> Roll No: {profile.rollNo}</span>
            <span><Building2 size={16} style={{ display: 'inline', marginRight: '4px' }} /> {profile.department}</span>
            <span><Mail size={16} style={{ display: 'inline', marginRight: '4px' }} /> {profile.email}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '0.75rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-orange)' }}>#{profile.rank}</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>GLOBAL RANK</div>
          </div>

          <button 
            onClick={() => { setEditForm(profile); setShowEditModal(true); }}
            className="btn btn-orange"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Badges & Skill Matrix Grid */}
      <div className="grid-2">
        
        {/* Badges & Achievements */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Earned Badges & Micro-Credentials</h3>
          <div className="grid-2">
            {profile.badges.map((b, idx) => (
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
              <strong style={{ color: 'var(--dark-heading)' }}>{profile.institution}</strong>
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

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '500px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--dark-heading)' }}>Edit Student Profile</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Batch</label>
                  <input
                    type="text"
                    value={editForm.batch}
                    onChange={(e) => setEditForm(prev => ({ ...prev, batch: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Institution</label>
                <input
                  type="text"
                  value={editForm.institution}
                  onChange={(e) => setEditForm(prev => ({ ...prev, institution: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-light">
                  Cancel
                </button>
                <button type="submit" className="btn btn-orange">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
