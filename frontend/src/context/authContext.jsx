import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

// context api to login and logout for user authentication
const authContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // verify user
  useEffect(() => {
    const verifiedUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/auth/verify",
            {
              // pass authorization token
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.reponse && !error.response.data.error) {
          setUser(null);
        }
      }
    };
    verifyUser();
  }, []);

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
