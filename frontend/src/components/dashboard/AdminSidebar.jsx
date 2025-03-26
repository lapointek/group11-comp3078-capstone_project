import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-sky-600 h-12 flex items-center justify-center">
        <h3 className="text-2x1 text-center font-sevillana">Employee MS</h3>
      </div>
      <div>
        <NavLink to="/admin-dashboard">
          <FaTachometerAlt />
          <span>DashBoard</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaUser />
          <span>Employee</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/admin-dashboard">
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
