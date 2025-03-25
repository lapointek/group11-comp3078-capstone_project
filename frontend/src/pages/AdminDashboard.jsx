import React from "react";
import { useAuth } from "../context/authContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  // print username
  return <div>Admin Dashboard {user.name}</div>;
};

export default AdminDashboard;
