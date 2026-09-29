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

export const changePasswordApi = async (currentPassword, newPassword) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    return { success: res.ok, message: data.message };
  } catch (error) {
    console.error('Change password error:', error);
    return { success: false, message: 'Server error' };
  }
};

export const updateProfileApi = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    return { success: res.ok, data: data.user, message: data.message };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, message: 'Server error' };
  }
};
