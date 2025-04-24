import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from './components/templates/NotFoundPage';
import RegistrationPage from './components/templates/RegistrationPage';
import Account from './components/templates/Account';
import LoginPage from './components/templates/LoginPage';
import ProtectedRoute, { PublicOnlyRoute } from './components/molecules/ProtectedRoute';

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
  {path:'/home', element: <App />},
  {path:'/login', element: <PublicLogin />},
  {path:'/register', element: <PublicRegister />},
  {path:'/account', element: <ProtectedAccount />},
  {path:'*', element: <NotFoundPage />},
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();