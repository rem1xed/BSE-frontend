import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './components/templates/NotFoundPage';
import RegistrationPage from './components/templates/RegistrationPage';
import Account from './components/templates/Account';
import LoginPage from './components/templates/LoginPage';
import AddPage from './components/templates/addPage';
import Layout from './components/templates/Layout';
import ProtectedRoute, { PublicOnlyRoute } from './components/molecules/ProtectedRoute';
import ForgotPassword from './components/templates/ResetPasswordPage';

// Елементи з перевіркою авторизації
const ProtectedAccount = () => (
  <ProtectedRoute>
    <Account />
  </ProtectedRoute>
);

const PublicLogin = () => (
  <PublicOnlyRoute>
    <LoginPage />
  </PublicOnlyRoute>
);

const PublicRegister = () => (
  <PublicOnlyRoute>
    <RegistrationPage />
  </PublicOnlyRoute>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home', element: <App /> },
      { path: 'login', element: <PublicLogin /> },
      { path: 'register', element: <PublicRegister /> },
      { path: 'account', element: <ProtectedAccount /> },
      { path: 'password-reset', element: <ForgotPassword /> },
      { path: 'add', element: <AddPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();