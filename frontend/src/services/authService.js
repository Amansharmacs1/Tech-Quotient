import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/auth';

export const login = async (email, password, role) => {
  const response = await axios.post(`${API_URL}/login`, { email, password, role });
  return response.data;
};

export const sendSignupOTP = async (data) => {
  const response = await axios.post(`${API_URL}/signup/send-otp`, data);
  return response.data;
};

export const verifySignupOTP = async (data) => {
  const response = await axios.post(`${API_URL}/signup/verify-otp`, data);
  return response.data;
};

export const sendPasswordResetOTP = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password/send-otp`, { email });
  return response.data;
};

export const verifyPasswordResetOTP = async (email, otp) => {
  const response = await axios.post(`${API_URL}/forgot-password/verify-otp`, { email, otp });
  return response.data;
};

export const resetPassword = async (email, resetToken, password) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email, resetToken, password });
  return response.data;
};
