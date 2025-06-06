import { api } from "./api";

export const isUserAuthenticated = async () => {
  try {
    await api.get('/auth/me/user', { withCredentials: true });
    return true;
  } catch {
    return false;
  }
};

export const isAdminAuthenticated = async () => {
  try {
    await api.get('/admin/me', { withCredentials: true });
    return true;
  } catch {
    return false;
  }
};

export const getAllUsers = async () => {
  return await api.get("/admin/get/users", { withCredentials: true });
}

const authService = {
  // === АДМІН ===
  adminLogin: async (email, password, key) => {
    const response = await api.post('/admin/login', { email, password, key }, { withCredentials: true });
    return response.data;
  },

  registerAdmin: async (userData) => {
    const response = await api.post('/admin/register', userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  getAdmin: async () => {
    const response = await api.get('/admin/me', { withCredentials: true });
    return response.data;
  },

  // === КОРИСТУВАЧ ===
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password }, { withCredentials: true });
    return response.data;
  },

  registerUser: async (userData) => {
    const response = await api.post('/auth/register', userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  getUser: async () => {
    const response = await api.get('/auth/me/user', { withCredentials: true });
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
    }
    return true;
  },

  adminLogout: async () => {
    try {
      await api.post('/admin/logout', {}, { withCredentials: true });
    } catch (err) {
    }
    return true;
  },

  isUserAuthenticated,

  requestPasswordReset: (email) => api.post('/auth/forgot-password', { email }),
  verifyResetCode: (email, code) => api.post('/auth/verify-code', { email, code }),
  resetPassword: (email, code, newPassword) =>
    api.post('/auth/reset-password', { email, code, newPassword }),
};

export { authService };
