import api from './api';

export const getCourses = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  
  const response = await api.get(`/courses?${params.toString()}`);
  return response.data.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData);
  return response.data.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data.data;
};
