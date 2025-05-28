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
import AboutUsPage from './components/templates/AboutUsPage';
import SupportPage from './components/templates/SupportPage';
import ContactUsPage from './components/templates/ContactUsPage';
import ChatList from './components/templates/ChatListPage';


// USER ELEMENTS


const ProtectedAccount = () => (
  <ProtectedRoute linkPart={'user'} redirectTo={"/login"}>
    <Account />
  </ProtectedRoute>
);

const PublicLogin = () => (
  <PublicOnlyRoute linkPart={'user'} redirectTo={"/"}>
    <LoginPage />
  </PublicOnlyRoute>
);

const PublicRegister = () => (
  <PublicOnlyRoute linkPart={'user'} redirectTo={"/"}>
    <RegistrationPage />
  </PublicOnlyRoute>
);

const PublicForgotPassword = () => (
  <PublicOnlyRoute linkPart={'user'} redirectTo={"/"}>
    <ForgotPassword />
  </PublicOnlyRoute>
);


// ADMIN ELEMENTS


const ProtectedAdmin = () => (
  <ProtectedRoute linkPart={'admin'} redirectTo={"/"}>
    <AdminHomePage />
  </ProtectedRoute>
);

const PublicAdminLogin = () => (
  <PublicOnlyRoute linkPart={'admin'} redirectTo={"/admin-home"}>
    <AdminLoginPage />
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
      { path: 'about-us', element: <AboutUsPage /> },
      { path: 'support', element: <SupportPage /> },
      { path: 'contact-us', element: <ContactUsPage/>},
      { path: 'chats', element: <ChatList/>},
      { path: '*', element: <NotFoundPage /> },
    ]
  },
  {
    path: '/', 
    element: <AuthLayout />, // Використовуємо спрощений макет
    children: [
      { path: 'login', element: <PublicLogin /> },
      { path: 'register', element: <PublicRegister /> },
      { path: 'password-reset', element: <PublicForgotPassword /> },
      { path: 'admin-home', element: <ProtectedAdmin /> }, // Головна сторінка адміністратора
      { path: 'admin-login', element: <PublicAdminLogin /> }, // Сторінка входу для адміністратора
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();