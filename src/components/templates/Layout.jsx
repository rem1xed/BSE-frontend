// src/components/templates/Layout.jsx
import React from 'react';
import Header from '../molecules/Header';
import Footer from '../molecules/Footer';
import { Outlet } from 'react-router-dom';
import styles from '../../styles/Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;