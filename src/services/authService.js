// services/authService.js
import axios from 'axios';

// Налаштування Axios з інтерсептором для авторизації
const api = axios.create({
  baseURL: 'http://localhost:1488',
  withCredentials: true, // Важливо для роботи з cookies
});

// Константи для зберігання
const TOKEN_KEY = 'authToken';
const USER_EMAIL_KEY = 'userEmail';

// Додаємо інтерсептор для додавання токену до всіх запитів
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Функції для роботи з локальним зберіганням
const setAuthData = (token, email) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (email) {
    localStorage.setItem(USER_EMAIL_KEY, email);
  }
  console.log('Токен збережено:', token);
};

const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
};

// Єдиний метод перевірки авторизації
const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) {
    return false;
  }
  
  // Проста валідація формату токену (перевіряємо, що це не пустий рядок)
  return token.length > 10;
};

const authService = {
  // Логін користувача
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Відповідь від сервера:', response.data);
      
      // Перевіряємо, чи є токен у відповіді
      const token = response.data.access_token;
      if (token) {
        setAuthData(token, email);  // Зберігаємо токен і email у localStorage
        return { success: true, data: response.data };
      } else {
        console.warn('❌ Відповідь не містить токену');
        throw new Error('Токен не отримано');
      }
    } catch (error) {
      console.error('Помилка входу:', error);
      return { success: false, error };
    }
  },

  // Отримання профілю користувача
  getProfile: async () => {
    try {
      // Якщо немає авторизації, повертаємо відповідний стан
      if (!isAuthenticated()) {
        return { isAuthenticated: false };
      }

      // Тепер використовуємо правильний шлях до ендпоінту, який відповідає бекенду
      const response = await api.get('/auth/me');
      return {
        ...response.data,
        isAuthenticated: true
      };
    } catch (error) {
      console.error('Помилка отримання профілю:', error);
      // Якщо помилка 401 або 403, тоді токен недійсний
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        clearAuthData(); // Видаляємо недійсні дані
        return { isAuthenticated: false };
      }
      // Інші помилки
      throw error;
    }
  },

  // Метод перевірки авторизації
  isAuthenticated,

  // Вихід із системи
  logout: async () => {
    try {
      // Видаляємо всі дані авторизації
      clearAuthData();
      console.log('Вихід виконано успішно');
      return { success: true };
    } catch (error) {
      console.error('Помилка при виході:', error);
      // У будь-якому випадку очищаємо дані
      clearAuthData();
      return { success: true, hadError: true };
    }
  },

  // Методи для відновлення пароля
  requestPasswordReset: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  verifyResetCode: async (email, code) => {
    return api.post('/auth/verify-code', { email, code });
  },

  resetPassword: async (token, password) => {
    // Змінено для відповідності бекенду
    return api.post('/auth/reset-password', { token, password });
  },

  // Додаємо метод для отримання налаштованого API
  getApi: () => api
};

export { authService };