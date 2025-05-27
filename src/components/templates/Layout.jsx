import React, { useState, useEffect } from 'react';
import Header from '../molecules/Header';
import Footer from '../molecules/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import styles from '../../styles/Layout.module.css';
import HashLoader from '../molecules/HashLoader';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // мінімальний час
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <HashLoader isLoading={isLoading} minTime={500}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.layout}
        >
          <Header />
          <main className={styles.mainContent}>
            <Outlet />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </HashLoader>
  );
};

export default Layout;
