import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading, userStatus } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }
  if (!user || userStatus == "blocked") {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
