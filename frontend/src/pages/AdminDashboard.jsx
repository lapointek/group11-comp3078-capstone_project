import React from "react";

const AdminDashboard = () => {
  const { user } = useAuth();
  return <div>Admin Dashboard {user.name}</div>;
};

export default AdminDashboard;
