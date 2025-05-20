import { api, AUTH_TOKEN_KEY, USER_EMAIL_KEY} from "./api"

// Функції для роботи з локальним зберіганням
const setAuthData = (token, email) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_EMAIL_KEY, email);
  console.log('Токен збережено:', token);
  
  // Встановлюємо токен для усіх майбутніх запитів
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const getUserEmail = () => {
  return localStorage.getItem(USER_EMAIL_KEY);
};

const clearAuthData = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  delete api.defaults.headers.common['Authorization'];
};

// Перевірка авторизації
const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Налаштовуємо перехоплювач для додавання токена до запитів
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  // Логін користувача
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Відповідь від сервера:', response.data);
      
      // Зберігаємо JWT токен з відповіді сервера
      if (response.data && response.data.access_token) {
        setAuthData(response.data.access_token, email);
        return response.data;
      } else {
        throw new Error('Відповідь не містить токен авторизації');
      }
    } catch (error) {
      console.error('Помилка входу:', error);
      throw error;
    }
  },

  // Отримання профілю користувача
  getProfile: async () => {
    try {
      // Перевіряємо авторизацію
      if (!isAuthenticated()) {
        throw new Error('Не авторизований');
      }
      
      // Запит до API для отримання даних профілю
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Помилка отримання профілю:', error);
      
      // Якщо отримали помилку авторизації, очищаємо локальне сховище
      if (error.response && error.response.status === 401) {
        clearAuthData();
      }
      
      throw error;
    }
  },

  // Перевірка авторизації
  isAuthenticated,

  // Вихід із системи
  logout: () => {
    clearAuthData();
    console.log('Вихід виконано успішно');
    return true;
  },

  requestPasswordReset: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  verifyResetCode: async (email, code) => {
    return api.post('/auth/verify-code', { email, code });
  },

  resetPassword: async (email, code, newPassword) => {
    return api.post('/auth/reset-password', { email, code, newPassword });
  },
};

export { authService };