import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const DepartmentList = () => {
  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 bg-sky-600 text-white rounded"
        >
          Add New Department
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default DepartmentList;
