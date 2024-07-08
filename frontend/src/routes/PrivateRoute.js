import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
