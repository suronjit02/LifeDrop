import React from "react";
import { Outlet } from "react-router";
import Aside from "../dashboard/dashboardComponent/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex gap-5">
      <Aside></Aside>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
