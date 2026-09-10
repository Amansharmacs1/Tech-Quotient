import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_STUDENT = {
  _id: 'user-student-1',
  id: 'user-student-1',
  name: 'Ansh Goyal',
  email: 'ansh.goyal@chitkarauniversity.edu.in',
  role: 'student',
  rollNumber: '2411981092',
  department: 'Computer Science & Engineering',
  institution: 'Chitkara University',
  batch: '2024',
  semester: 'Fall 2026',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  problemsSolved: 142,
  accuracy: '88.5%',
  streak: 14,
  globalRank: 12
};

const DEFAULT_FACULTY = {
  _id: 'user-faculty-1',
  id: 'user-faculty-1',
  name: 'Prof. Doe',
  email: 'prof.doe@chitkarauniversity.edu.in',
  role: 'faculty',
  title: 'Professor & Head of CSE Dept',
  department: 'Computer Science & Engineering',
  institution: 'Chitkara University',
  avatar: 'https://ui-avatars.com/api/?name=Professor+Doe&background=FFF1E8&color=F26422',
  totalStudents: 250,
  activeAssignments: 32,
  problemsCreated: 150,
  averageScore: '82%'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('techquotient_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_STUDENT;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('techquotient_token') || 'mock-jwt-token-student';
  });

  const role = user?.role || 'student';
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
      localStorage.setItem('token', token); // For backward compatibility
    } else {
      localStorage.removeItem('techquotient_token');
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password, roleHint = 'student') => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: roleHint })
      });

      if (res.ok) {
        const data = await res.json();
        const loggedUser = data.user || (roleHint === 'faculty' ? DEFAULT_FACULTY : DEFAULT_STUDENT);
        const jwtToken = data.token || (roleHint === 'faculty' ? 'mock-jwt-token-faculty' : 'mock-jwt-token-student');
        setUser(loggedUser);
        setToken(jwtToken);
        return { success: true, role: loggedUser.role };
      }
    } catch (err) {
      console.warn('API login request failed, using instant fallback login:', err.message);
    }

    // Fallback login
    const isFaculty = roleHint === 'faculty' || email.includes('faculty') || email.includes('prof');
    const fallbackUser = isFaculty ? DEFAULT_FACULTY : DEFAULT_STUDENT;
    const fallbackToken = isFaculty ? 'mock-jwt-token-faculty' : 'mock-jwt-token-student';
    setUser(fallbackUser);
    setToken(fallbackToken);
    return { success: true, role: fallbackUser.role };
  };

  const register = async (formData) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        const newUser = data.user;
        const jwtToken = data.token;
        setUser(newUser);
        setToken(jwtToken);
        return { success: true, role: newUser.role };
      }
    } catch (err) {
      console.warn('API register request failed, using fallback:', err.message);
    }

    const newUser = {
      _id: 'user-' + Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role || 'student',
      department: formData.department || 'Computer Science',
      institution: formData.institution || 'Chitkara University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setUser(newUser);
    setToken('mock-jwt-token-' + newUser.role);
    return { success: true, role: newUser.role };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('techquotient_user');
    localStorage.removeItem('techquotient_token');
    localStorage.removeItem('token');
  };

  const switchRole = (newRole) => {
    const target = newRole || (role === 'faculty' ? 'student' : 'faculty');
    if (target === 'faculty') {
      setUser(DEFAULT_FACULTY);
      setToken('mock-jwt-token-faculty');
    } else {
      setUser(DEFAULT_STUDENT);
      setToken('mock-jwt-token-student');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      role,
      isAuthenticated,
      login,
      register,
      logout,
      switchRole,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
