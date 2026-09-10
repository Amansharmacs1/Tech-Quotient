import api from './api';

export const getProblems = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.course) params.append('course', filters.course);
  if (filters.topic) params.append('topic', filters.topic);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/problems?${params.toString()}`);
  return response.data.data;
};

export const getProblemById = async (id) => {
  const response = await api.get(`/problems/${id}`);
  return response.data.data;
};

export const createProblem = async (problemData) => {
  const response = await api.post('/problems', problemData);
  return response.data.data;
};

export const updateProblem = async (id, problemData) => {
  const response = await api.put(`/problems/${id}`, problemData);
  return response.data.data;
};

export const deleteProblem = async (id) => {
  const response = await api.delete(`/problems/${id}`);
  return response.data.data;
};
