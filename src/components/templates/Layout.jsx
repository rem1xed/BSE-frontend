// src/components/templates/Layout.jsx
import React from 'react';
import Header from '../molecules/Header'; // Шлях до вашого компонента Header
import Footer from '../molecules/Footer'; // Шлях до вашого компонента Footer
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Тут будуть рендеритися вкладені маршрути */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;