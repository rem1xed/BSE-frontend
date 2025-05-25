import axios from 'axios';

// Налаштування Axios
const api = axios.create({
  baseURL: 'http://localhost:1488',
  withCredentials: true // Важливо для роботи з cookies
});

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_ADMIN_TOKEN_KEY = "auth_admin_token";
const USER_EMAIL_KEY = 'userEmail';

export { api, AUTH_TOKEN_KEY, USER_EMAIL_KEY };