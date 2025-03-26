import React from "react";
import { useAuth } from "../context/authContext";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }
  // if employee is passed instead of admin as role, navigate to unauthorized page
  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized"></Navigate>;
  }

  // if user is not null return children else navigate to login page
  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
