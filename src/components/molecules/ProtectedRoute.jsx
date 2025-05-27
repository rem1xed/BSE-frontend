import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated, isUserAuthenticated } from '../../api/authService';

const ProtectedRoute = ({ children, linkPart, redirectTo }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let res = false;
        if (linkPart === "user") {
          res = await isUserAuthenticated();
        } else if (linkPart === "admin") {
          res = await isAdminAuthenticated();
        }
        setIsAuth(res);
      } catch (err) {
        console.log("Користувач не авторизований");
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <></>; // Або <Spinner />

  return isAuth ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
