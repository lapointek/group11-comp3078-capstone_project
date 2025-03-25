import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // if loading is true
  if (loading) {
    return <div>Loading....</div>;
  }

  // if user not successfully verified redirect to login page
  if (!user) {
    navigate("/login");
  }

  return <div>Admin Dashboard {user && user.name}</div>;
};

export default AdminDashboard;
