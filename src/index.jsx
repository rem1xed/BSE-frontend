import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from './components/templates/NotFoundPage';
import RegistrationPage from './components/templates/RegistrationPage';
import ForgotPassword from './components/templates/forgetpassword'; // Імпортуйте компонент

const router = createBrowserRouter([
  {path:'/', element: <App />},
  {path:'/register', element: <RegistrationPage />},
  {path:'/forgotpassword', element: <ForgotPassword />}, // Додано новий маршрут
  {path:'*', element: <NotFoundPage />},
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();