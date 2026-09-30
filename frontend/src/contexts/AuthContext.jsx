import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';


const CURRENT_AUTH_VERSION = 'v2_clean';
if (typeof window !== 'undefined' && localStorage.getItem('auth_version') !== CURRENT_AUTH_VERSION) {
  localStorage.removeItem('techquotient_user');
  localStorage.removeItem('techquotient_token');
  localStorage.removeItem('token');
  localStorage.setItem('auth_version', CURRENT_AUTH_VERSION);
}

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('techquotient_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Force clear legacy mock user
        if (parsed.id === 'user-student-1' || parsed.id === 'user-faculty-1' || String(parsed._id).startsWith('user-')) {
          localStorage.removeItem('techquotient_user');
          return null;
        }
        return parsed;
      } catch (e) {}
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('techquotient_token');
    // Force clear legacy mock token
    if (savedToken && savedToken.startsWith('mock-jwt-token')) {
      localStorage.removeItem('techquotient_token');
      localStorage.removeItem('token');
      return null;
    }
    return savedToken || null;
  });

  const role = user?.role || null;
  const isAuthenticated = !!token;

  useEffect(() => {
    if (user) {
      localStorage.setItem('techquotient_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('techquotient_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('techquotient_token', token);
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('techquotient_token');
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password, roleHint) => {
    try {
      const data = await authService.login(email, password, roleHint);
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, role: data.user.role };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const completeSignup = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      role,
      isAuthenticated,
      login,
      logout,
      setUser,
      completeSignup
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
