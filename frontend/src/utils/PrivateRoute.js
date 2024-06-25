import React from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../services/UserService';

const PrivateRoute = ({ children }) => {
  return UserService.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;