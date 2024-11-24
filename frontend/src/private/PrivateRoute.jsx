import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/Authcontext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();


  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;