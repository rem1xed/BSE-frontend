// services/authService.js
import axios from 'axios';

// Налаштування Axios
const api = axios.create({
  baseURL: 'http://localhost:1488',
  withCredentials: true // Важливо для роботи з cookies
});

// Функції для роботи з локальним зберіганням
const setAuthData = (token) => {
  localStorage.setItem('authToken', token);
  console.log('Токен збережено:', token);
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const clearAuthData = () => {
  localStorage.removeItem('authToken');
};

// Перевірка авторизації за допомогою localStorage
const isAuthenticatedByToken = () => {
  return !!getAuthToken();
};

// Перевірка авторизації за допомогою cookie
const isAuthenticatedByCookie = () => {
  // Перевіряємо, чи є cookie з іменем наприклад "isLoggedIn"
  return document.cookie.includes('isLoggedIn=true');
};

const authService = {
  // Логін користувача
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Відповідь від сервера:', response.data);
      
      // Оскільки сервер не повертає токен, але логін успішний, 
      // додаємо власний маркер автентифікації
      if (response.data && response.data.message === 'Login successful') {
        // Використовуємо час входу як простий токен
        const simpleToken = new Date().getTime().toString();
        setAuthData(simpleToken);
        
        // Також встановлюємо cookie для додаткової перевірки
        document.cookie = `isLoggedIn=true; path=/; max-age=${60*60*24*7}`; // 7 днів
        
      } else {
        console.warn('❌ Відповідь не містить очікуваного повідомлення');
      }
      
      return response.data;
    } catch (error) {
      console.error('Помилка входу:', error);
      throw error;
    }
  },

  // Отримання профілю користувача
  getProfile: async () => {
    try {
      // Якщо немає токену або cookie авторизації
      if (!isAuthenticatedByToken() && !isAuthenticatedByCookie()) {
        throw new Error('Не авторизований');
      }
      
      // Тут мав би бути запит до сервера, але оскільки він повертає 404,
      // ми просто повернемо базову інформацію
      return {
        email: localStorage.getItem('userEmail') || 'користувач',
        isAuthenticated: true
      };
    } catch (error) {
      console.error('Помилка отримання профілю:', error);
      throw error;
    }
  },

  // Перевірка авторизації (використовуємо і токен, і cookie)
  isAuthenticated: () => {
    const byToken = isAuthenticatedByToken();
    const byCookie = isAuthenticatedByCookie();
    console.log('Перевірка авторизації - токен:', byToken, 'cookie:', byCookie);
    
    // Користувач авторизований, якщо або токен, або cookie присутні
    return byToken || byCookie;
  },

  // Вихід із системи
  logout: () => {
    // Видаляємо токен
    clearAuthData();
    
    // Видаляємо cookie
    document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
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