// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

/**
 * Компонент для захисту маршрутів, які доступні лише авторизованим користувачам
 */
const ProtectedRoute = ({ children }) => {
  const isAuth = authService.isAuthenticated();
  console.log('ProtectedRoute перевірка: isAuthenticated =', isAuth);
  console.log('Токен з localStorage:', localStorage.getItem('authToken'));
  
  if (!isAuth) {
    console.log('Доступ обмежено. Перенаправлення на /login');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * Компонент для захисту маршрутів, які доступні лише неавторизованим користувачам
 */
export const PublicOnlyRoute = ({ children }) => {
  const isAuth = authService.isAuthenticated();
  
  if (isAuth) {
    console.log('Користувач уже авторизований. Перенаправлення на /account');
    return <Navigate to="/account" replace />;
  }
  
  return children;
};

export default ProtectedRoute;