import api from './api';

export const getDashboardAnalytics = async () => {
  const response = await api.get('/analytics/dashboard');
  return response.data.data;
};

export const getFullAnalytics = async () => {
  const response = await api.get('/analytics/full');
  return response.data.data;
};
