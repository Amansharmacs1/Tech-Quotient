import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Users, ArrowRight, Lock, Mail, User, Building } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [institution, setInstitution] = useState('Chitkara University');
  const [rollNumber, setRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await register({
        name,
        email,
        password,
        role,
        department,
        institution,
        rollNumber: rollNumber || (role === 'student' ? '241198' + Math.floor(1000 + Math.random() * 9000) : undefined)
      });

      if (result.success) {
        navigate(result.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard', { replace: true });
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error registering account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ backgroundColor: '#f26422', color: '#ffffff', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
            TQ
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            Tech<span style={{ color: '#f26422' }}>Quotient</span>
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Create Your Academic Account</p>
      </div>

      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#ffffff', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Register Account
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Join the platform to access coding assignments and courses.
        </p>

        {/* Role Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.35rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setRole('student')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: role === 'student' ? '#ffffff' : 'transparent',
              color: role === 'student' ? '#f26422' : '#64748b',
              fontWeight: role === 'student' ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: role === 'student' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <GraduationCap size={18} /> Student
          </button>

          <button
            type="button"
            onClick={() => setRole('faculty')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: role === 'faculty' ? '#ffffff' : 'transparent',
              color: role === 'faculty' ? '#f26422' : '#64748b',
              fontWeight: role === 'faculty' ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: role === 'faculty' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <Users size={18} /> Faculty
          </button>
        </div>

        {errorMessage && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aryan Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@chitkarauniversity.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                {role === 'student' ? 'Roll Number' : 'Designation'}
              </label>
              <input
                type="text"
                placeholder={role === 'student' ? '2411981092' : 'Asst. Professor'}
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: '#f26422',
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(242, 100, 34, 0.25)'
            }}
          >
            {isLoading ? 'Creating Account...' : `Register as ${role === 'faculty' ? 'Faculty' : 'Student'}`}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f26422', fontWeight: 700, textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>

      </div>

    </div>
  );
}
