import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

// context api to login and logout for user authentication
const authContext = ({ children }) => {
  const [user, setUser] = useState(null);

  // login user - passing user from Login
  const login = (user) => {
    setUser(user);
  };

  // logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default authContext;
