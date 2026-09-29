import React, { useState } from 'react';
import { User, Mail, Building2, BookOpen, Code2, Flame, GraduationCap, Edit3, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfileApi } from '../../services/authService';

export default function Profile({ role = 'student', onUpdateProfile }) {
  const { user } = useAuth();
  
  const displayName = (user?.email ? user.email.split('@')[0] : user?.name) || 'Student';
  const initial = displayName.charAt(0).toUpperCase();

  const profile = {
    ...user,
    name: displayName,
    email: user?.email || '',
    department: user?.department || 'Computer Science & Engineering',
    institution: user?.institution || 'Chitkara University',
    batch: user?.batch || '2024',
    problemsSolved: user?.problemsSolved || 0,
    streak: user?.streak || 0,
    enrolledCoursesCount: user?.enrolledCoursesCount || 0
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    department: profile.department,
    institution: profile.institution,
    batch: profile.batch
  });

  const [isSaving, setIsSaving] = useState(false);
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateProfileApi(editForm);
    setIsSaving(false);
    if (res.success) {
      if (onUpdateProfile) onUpdateProfile(editForm);
      setShowEditModal(false);
      window.location.reload();
    } else {
      alert(res.message || "Failed to update profile");
    }
  };

  return (
    <div className="page-body animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            backgroundColor: 'var(--primary-orange)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '2.5rem', fontWeight: 800, border: '4px solid white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            {initial}
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--dark-heading)', margin: 0 }}>
              {profile.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginTop: '4px', fontSize: '0.9rem' }}>
              <Mail size={14} /> {profile.email}
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setShowEditModal(true)}
          className="btn btn-outline"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Academic Details */}
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={18} color="var(--primary-orange)" /> Academic Information
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Institution</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                <Building2 size={16} color="var(--text-muted)" /> {profile.institution}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Department</div>
              <div style={{ fontWeight: 500 }}>{profile.department}</div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Batch</div>
              <div style={{ fontWeight: 500 }}>{profile.batch}</div>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="var(--primary-orange)" /> Platform Statistics
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Code2 size={20} color="#3b82f6" />
                <span style={{ fontWeight: 600, color: 'var(--dark-heading)' }}>Problems Solved</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{profile.problemsSolved}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Flame size={20} color="#ef4444" />
                <span style={{ fontWeight: 600, color: 'var(--dark-heading)' }}>Current Streak</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{profile.streak} Days</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BookOpen size={20} color="#10b981" />
                <span style={{ fontWeight: 600, color: 'var(--dark-heading)' }}>Enrolled Courses</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{profile.enrolledCoursesCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', maxWidth: '450px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Name (derived from email prefix)</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  disabled
                  style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed", color: '#9ca3af' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  disabled style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed", color: '#9ca3af' }}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Institution</label>
                <input
                  type="text"
                  value={editForm.institution}
                  onChange={(e) => setEditForm(prev => ({ ...prev, institution: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Batch / Cohort</label>
                  <input
                    type="text"
                    value={editForm.batch}
                    onChange={(e) => setEditForm(prev => ({ ...prev, batch: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-light" style={{ padding: '0.5rem 1rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-orange" style={{ padding: '0.5rem 1rem' }} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
