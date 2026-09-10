import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// 1. Central Axios instance for Faculty & General Services
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('techquotient_token') || localStorage.getItem('token') || 'mock-jwt-token-student';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// 2. Named Helper Functions (Maintained for Student Portal Component Integrations)
const getHeaders = () => {
  const token = localStorage.getItem('techquotient_token') || localStorage.getItem('token') || 'mock-jwt-token-student';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchStudentProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, { headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.profile || data.user || data.data;
    }
  } catch (err) {
    console.warn('API fetch failed, using local profile fallback');
  }
  return null;
};

export const fetchCourses = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/courses`, { headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.courses || data.data;
    }
  } catch (err) {
    console.warn('API fetch failed, using local courses fallback');
  }
  return null;
};

export const fetchProblems = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/problems`, { headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.problems || data.data;
    }
  } catch (err) {
    console.warn('API fetch failed, using local problems fallback');
  }
  return null;
};

export const runCodeApi = async (code, language, problemId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/submissions/run`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code, language, problemId })
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    }
  } catch (err) {
    console.warn('API call failed, using code runner fallback');
  }
  return null;
};

export const submitCodeApi = async (code, language, problemId, assignmentId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/submissions/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code, language, problemId, assignmentId })
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    }
  } catch (err) {
    console.warn('API call failed, using submit code fallback');
  }
  return null;
};

export const fetchAssignments = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/assignments`, { headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.assignments || data.data;
    }
  } catch (err) {
    console.warn('API fetch failed, using local assignments fallback');
  }
  return null;
};

export const submitAssignmentApi = async (id, code, language) => {
  try {
    const res = await fetch(`${API_BASE_URL}/assignments/${id}/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code, language })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API call failed, using assignment submission fallback');
  }
  return null;
};

export const fetchContests = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/contests`, { headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.contests || data.data;
    }
  } catch (err) {
    console.warn('API fetch failed, using local contests fallback');
  }
  return null;
};

export const registerContestApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/contests/${id}/register`, {
      method: 'POST',
      headers: getHeaders()
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API call failed, using contest registration fallback');
  }
  return null;
};

export const fetchNotifications = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications`, { headers: getHeaders() });
    if (res.ok) {
      const data = await res.json();
      return data.notifications || data.data;
    }
  } catch (err) {
    console.warn('API fetch failed, using local notifications fallback');
  }
  return null;
};

export const sendAiQueryApi = async (query, code) => {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ query, code })
    });
    if (res.ok) {
      const data = await res.json();
      return data.response || data.data;
    }
  } catch (err) {
    console.warn('API call failed, using AI mentor fallback');
  }
  return null;
};

export default api;
