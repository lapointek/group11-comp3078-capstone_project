import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  // fetch department data from server
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons />,
          }));
          setDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    // if loading is not true display data
    <>
      {depLoading ? (
        <div>Loading....</div>
      ) : (
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
          <div className="mt-5">
            <DataTable columns={columns} data={departments} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
