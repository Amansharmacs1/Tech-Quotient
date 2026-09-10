import api from './api';

export const getSubmissions = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.studentId) params.append('studentId', filters.studentId);
  if (filters.assignmentId) params.append('assignmentId', filters.assignmentId);
  if (filters.problemId) params.append('problemId', filters.problemId);
  if (filters.status) params.append('status', filters.status);
  
  const response = await api.get(`/submissions?${params.toString()}`);
  return response.data.data;
};

export const getSubmissionById = async (id) => {
  const response = await api.get(`/submissions/${id}`);
  return response.data.data;
};
