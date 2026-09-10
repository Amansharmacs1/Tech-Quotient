import api from './api';

export const getAssignments = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.courseId) params.append('courseId', filters.courseId);
  
  const response = await api.get(`/assignments?${params.toString()}`);
  return response.data.data;
};

export const getAssignmentById = async (id) => {
  const response = await api.get(`/assignments/${id}`);
  return response.data.data;
};

export const createAssignment = async (data) => {
  const response = await api.post('/assignments', data);
  return response.data.data;
};

export const updateAssignment = async (id, data) => {
  const response = await api.put(`/assignments/${id}`, data);
  return response.data.data;
};

export const deleteAssignment = async (id) => {
  const response = await api.delete(`/assignments/${id}`);
  return response.data.data;
};
