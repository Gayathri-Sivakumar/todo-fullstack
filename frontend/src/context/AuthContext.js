import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setCurrentUser({ token });
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("authToken", user.token);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
