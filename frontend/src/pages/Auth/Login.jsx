import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Users, ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [activeRole, setActiveRole] = useState('student');
  const [email, setEmail] = useState('ansh.goyal@chitkara.edu.in');
  const [password, setPassword] = useState('student123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fillDemo = (role) => {
    setActiveRole(role);
    if (role === 'student') {
      setEmail('ansh.goyal@chitkara.edu.in');
      setPassword('student123');
    } else {
      setEmail('prof.doe@chitkara.edu.in');
      setPassword('faculty123');
    }
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await login(email, password, activeRole);
      if (result.success) {
        const dest = location.state?.from?.pathname || 
          (result.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
        navigate(dest, { replace: true });
      } else {
        setErrorMessage(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error signing in.');
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
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Unified Academic Engineering Portal</p>
      </div>

      {/* Main Login Card */}
      <div style={{ width: '100%', maxWidth: '460px', backgroundColor: '#ffffff', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)', border: '1px solid #e2e8f0' }}>
        
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Sign In to TechQuotient
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
          Select your portal role to access your academic dashboard.
        </p>

        {/* Role Selector Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.35rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={() => fillDemo('student')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: activeRole === 'student' ? '#ffffff' : 'transparent',
              color: activeRole === 'student' ? '#f26422' : '#64748b',
              fontWeight: activeRole === 'student' ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeRole === 'student' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <GraduationCap size={18} /> Student Portal
          </button>

          <button
            type="button"
            onClick={() => fillDemo('faculty')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: activeRole === 'faculty' ? '#ffffff' : 'transparent',
              color: activeRole === 'faculty' ? '#f26422' : '#64748b',
              fontWeight: activeRole === 'faculty' ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeRole === 'faculty' ? '0 2px 5px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Users size={18} /> Faculty Portal
          </button>
        </div>

        {/* 1-Click Fast Evaluator Fill Notice */}
        <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#9a3412', fontWeight: 600 }}>
            <Sparkles size={16} color="#f26422" />
            <span>Active Demo Account: <strong>{activeRole === 'student' ? 'Ansh Goyal' : 'Prof. Doe'}</strong></span>
          </div>
          <button
            type="button"
            onClick={() => fillDemo(activeRole)}
            style={{ background: 'none', border: 'none', color: '#f26422', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Reset
          </button>
        </div>

        {errorMessage && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              Academic Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Submit button */}
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
              boxShadow: '0 4px 12px rgba(242, 100, 34, 0.25)',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Authenticating...' : `Enter ${activeRole === 'faculty' ? 'Faculty' : 'Student'} Portal`}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#f26422', fontWeight: 700, textDecoration: 'none' }}>
            Register here
          </Link>
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>
            ← Back to Landing Page
          </Link>
        </div>

      </div>

    </div>
  );
}
