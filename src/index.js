import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from './components/templates/NotFoundPage';
import RegistrationPage from './components/templates/RegistrationPage';


const router = createBrowserRouter([
  {path:'/', element: <App />},
  {path:'/register', element: <RegistrationPage />},
  {path:'*', element: <NotFoundPage />},  //Fix issue with .css for every page
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
