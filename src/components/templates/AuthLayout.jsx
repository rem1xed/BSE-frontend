// src/components/templates/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main>
        <Outlet /> {/* Тут будуть рендеритися вкладені маршрути */}
      </main>
    </>
  );
};

export default AuthLayout;