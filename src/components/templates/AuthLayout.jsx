import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HashLoader from '../molecules/HashLoader';
import { motion, AnimatePresence } from 'framer-motion';

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // мінімальний час для лоадера
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <HashLoader isLoading={isLoading} minTime={500}>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </HashLoader>
  );
};

export default AuthLayout;
