import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PublicOnlyRoute = ({ children, redirectTo = '/' }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1488/auth/me', { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (isAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicOnlyRoute;