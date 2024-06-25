import React from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../services/UserService';

const PublicRoute = ({ children }) => {
  return UserService.isAuthenticated() ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;