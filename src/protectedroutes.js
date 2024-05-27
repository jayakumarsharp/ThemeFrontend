import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/authentication/sign-in" />;
};

export default ProtectedRoute;