import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex item-center text-white justify-between h-12 bg-sky-600 px-5">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-1 bg-sky-700 hover:bg-sky-800">Logout</button>
    </div>
  );
};

export default Navbar;
