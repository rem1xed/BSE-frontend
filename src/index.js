import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/templates/Layout';
import AuthLayout from './components/templates/AuthLayout';

import ProtectedRoute  from './components/molecules/ProtectedRoute';
import PublicOnlyRoute  from './components/molecules/PublicOnlyRoute';

import Home from './Home';
import NotFoundPage from './components/templates/NotFoundPage';
import RegistrationPage from './components/templates/RegistrationPage';
import Account from './components/templates/Account';
import LoginPage from './components/templates/LoginPage';
import AddPage from './components/templates/addPage';
import ForgotPassword from './components/templates/ForgotPasswordPage';
import AdminLoginPage from './components/templates/AdminLoginPage';
import AdminHomePage from './components/templates/AdminHomePage';

// Елементи з перевіркою авторизації
const ProtectedAccount = () => (
  <ProtectedRoute link={"/login"}>
    <Account />
  </ProtectedRoute>
);

const PublicLogin = () => (
  <PublicOnlyRoute link={"/"}>
    <LoginPage />
  </PublicOnlyRoute>
);

const PublicRegister = () => (
  <PublicOnlyRoute link={"/"}>
    <RegistrationPage />
  </PublicOnlyRoute>
);

const PublicForgotPassword = () => (
  <PublicOnlyRoute link={"/"}>
    <ForgotPassword />
  </PublicOnlyRoute>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // Головна сторінка з повним макетом
      { path: 'account', element: <ProtectedAccount /> },
      { path: 'add', element: <AddPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  {
    path: '/', 
    element: <AuthLayout />, // Використовуємо спрощений макет
    children: [
      { path: 'login', element: <PublicLogin /> },
      { path: 'register', element: <PublicRegister /> },
      { path: 'password-reset', element: <PublicForgotPassword /> },
      { path: 'admin-login', element: <AdminLoginPage /> }, // Сторінка входу для адміністратора
      { path: 'admin-home', element: <AdminHomePage /> }, // Головна сторінка адміністратора
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();