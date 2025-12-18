import React, { useContext } from "react";
import { Navigate } from "react-router";
import Loader from "../components/Loader";
import { AuthContext } from "./AuthProvider";

const AdminRouter = ({ children }) => {
  const { loading, role } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  if (role !== "active") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRouter;
