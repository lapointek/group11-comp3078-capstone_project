export const columns = [
  {
    // column name in database
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = () => {
  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-sky-600 text-white">Edit</button>
      <button className="px-3 py-1 bg-red-600 text-white">Delete</button>
      <button>Delete</button>
    </div>
  );
};
