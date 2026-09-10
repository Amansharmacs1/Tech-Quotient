import api from './api';

export const getStudents = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.courseId) params.append('courseId', filters.courseId);
  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/students?${params.toString()}`);
  return response.data.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data.data;
};
