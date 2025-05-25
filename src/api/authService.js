import { api, USER_EMAIL_KEY } from "./api";
import { setCookie, getCookie, deleteCookie } from "./cookie";

const setUserEmail = (email) => {
  setCookie(USER_EMAIL_KEY, email);
};

const getUserEmail = () => getCookie(USER_EMAIL_KEY);

const clearAuthData = () => {
  deleteCookie(USER_EMAIL_KEY);
};

const isAuthenticated = async () => {
  try {
    await api.get('http://localhost:1488/auth/me', { withCredentials: true });
    return true;
  } catch {
    return false;
  }
};

const authService = {
  login: async (email, password) => {
  const response = await api.post('/auth/login', { email, password }, { withCredentials: true });
  // Збереження email у cookie (якщо потрібно)
  setUserEmail(email); // якщо ця функція є у authService
  return response.data;
},

  registerUser: async (userData) => {
    const response = await api.post('/auth/register', userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout error:', err);
    }
    clearAuthData();
    console.log('Вихід виконано успішно');
    return true;
  },

  getProfile: async () => {
    try {
      const response = await api.get('http://localhost:1488/auth/me', { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) clearAuthData();
      throw error;
    }
  },

  isAuthenticated,

  requestPasswordReset: (email) => api.post('/auth/forgot-password', { email }),
  verifyResetCode: (email, code) => api.post('/auth/verify-code', { email, code }),
  resetPassword: (email, code, newPassword) =>
    api.post('/auth/reset-password', { email, code, newPassword }),
};

export { authService };
