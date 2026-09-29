import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../contexts/AuthContext';
import { updateProfileApi } from '../../services/authService';

export default function Profile({ role = 'student', onUpdateProfile }) {
  const { user } = useAuth();
  
  // Set default fallbacks if missing
  const profile = {
    ...user,
    name: (user?.email ? user.email.split('@')[0] : user?.name) || 'Student',
    email: user?.email || '',
    department: user?.department || 'Computer Science & Engineering',
    institution: user?.institution || 'Chitkara University',
    batch: user?.batch || '2024',
    globalRank: user?.globalRank || 'N/A',
    problemsSolved: user?.problemsSolved || 0,
    badges: user?.badges || [],
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    department: profile.department,
    institution: profile.institution,
    batch: profile.batch,
    avatar: profile.avatar
  });

  const [isSaving, setIsSaving] = useState(false);
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateProfileApi(editForm);
    setIsSaving(false);
    if (res.success) {
      setProfile({ ...profile, ...editForm });
      if (onUpdateProfile) onUpdateProfile(editForm);
      setShowEditModal(false);
      // Optional: window.location.reload() to update auth context across app
      window.location.reload();
    } else {
      alert(res.message || "Failed to update profile");
    }
  };

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Profile Header Banner */}
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '20px',
        padding: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decoration */}
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--primary-orange) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(40px)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 1 }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-orange)' }}
            />
          </div>
          
          <div style={{ color: 'white' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {profile.name}
              <span style={{ fontSize: '0.9rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 600 }}>
                Batch {profile.batch}
              </span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={16} />
                {profile.department}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} />
                {profile.email}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', padding: '0.75rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-orange)' }}>#{profile.globalRank}</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>GLOBAL RANK</div>
          </div>

          <button 
            onClick={() => setShowEditModal(true)}
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
            {profile.badges && profile.badges.length > 0 ? (
              profile.badges.map((b, idx) => (
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
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No badges earned yet. Keep solving problems to earn badges!
              </div>
            )}
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
              <span style={{ color: 'var(--text-muted)' }}>Department:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>{profile.department}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Batch Cohort:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>{profile.batch}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Coding Submissions:</span>
              <strong style={{ color: 'var(--dark-heading)' }}>{profile.problemsSolved} Runs</strong>
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
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} disabled style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
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
