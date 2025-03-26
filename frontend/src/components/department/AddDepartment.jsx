import React from "react";
import { Link } from "react-router-dom";

const AddDepartment = () => {
  return (
    <div className="max-w-3x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2x1 font-bold mb-6">Add New Department</h2>
      <form>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            placeholder="Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
