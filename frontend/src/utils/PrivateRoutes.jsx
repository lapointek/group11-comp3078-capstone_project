import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  // if loading is true return loading....
  if (loading) {
    return <div>Loading....</div>;
  }
  // if user exists return children else navigate to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
