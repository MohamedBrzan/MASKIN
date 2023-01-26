import axios from 'axios';
import { toast } from 'react-toastify';

const REGISTER_URL = '/api/v1/user/register';
const LOGIN_URL = '/api/v1/user/login';
const LOGOUT_URL = '/api/v1/user/logout';
const RESET_PASSWORD_URL = '/api/v1/user/reset-password';
const FORGOT_PASSWORD_URL = '/api/v1/user/forgot-password';

// Register User
const register = async (userData) => {
  const response = await axios({
    method: 'POST',
    url: REGISTER_URL,
    data: userData,
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.href = '/';
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios({
    method: 'POST',
    url: LOGIN_URL,
    data: userData,
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.href = '/';
  }

  return response.data;
};

// Logout User
const logout = async () => {
  await axios({
    method: 'GET',
    url: LOGOUT_URL,
  });

  return localStorage.removeItem('user');
};

// Forgot Password
const forgotPassword = async (email) => {
  const response = await axios({
    method: 'POST',
    url: FORGOT_PASSWORD_URL,
    data: { email },
  });

  if (response.data) {
    localStorage.setItem('userData', JSON.stringify(response.data));
    toast.success('تم إرسال لينك إلى الإيميل الخاص بك لتغيير كلمة المرور');
  }
};

// Reset Password
const resetPassword = async (data) => {
  const response = await axios({
    method: 'POST',
    url: RESET_PASSWORD_URL,
    data: data,
  });

  if (response.data) {
    localStorage.removeItem('userData');
    toast.success('تم نغيير كلمة المرور بنجاح');
    window.location.href = '/login';
  }
};

const AuthService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};

export default AuthService;
