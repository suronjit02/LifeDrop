import { useState } from "react";
import { Outlet } from "react-router";
import Aside from "../dashboard/dashboardComponent/Aside";
import DashboardTopbar from "../dashboard/dashboardComponent/DashboardTopbar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardTopbar setOpen={setOpen} />

      <div className="flex">
        <Aside isOpen={open} setOpen={setOpen} />

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
