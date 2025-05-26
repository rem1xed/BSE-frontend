import axios from 'axios';
// import proccess from 

// Налаштування Axios
const api = axios.create({
  baseURL: 'http://localhost:1488',
  withCredentials: true // Важливо для роботи з cookies
});

const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY;
const AUTH_ADMIN_TOKEN_KEY = process.env.AUTH_ADMIN_TOKEN_KEY;

export { api, AUTH_TOKEN_KEY, AUTH_ADMIN_TOKEN_KEY };