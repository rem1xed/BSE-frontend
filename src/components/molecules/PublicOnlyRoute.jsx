import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated, isUserAuthenticated } from '../../api/authService';

const PublicOnlyRoute = ({ children, linkPart, redirectTo }) => {
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

  return isAuth ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicOnlyRoute;
