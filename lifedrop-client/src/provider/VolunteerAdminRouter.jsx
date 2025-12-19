import React, { useContext } from "react";
import { Navigate } from "react-router";
import Loader from "../components/Loader";
import { AuthContext } from "./AuthProvider";

const VolunteerAdminRouter = ({ children }) => {
  const { loading, role } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  if (role !== "volunteer" && role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default VolunteerAdminRouter;
