import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardProfile from "../dashboard/dashboardPage/DashboardProfile";
import NotFindPage from "../pages/NotFindPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "*",
        element: <NotFindPage></NotFindPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,

    children: [
      {
        index: true,
        element: <DashboardProfile></DashboardProfile>,
      },
      {
        path: "/dashboard/profile",
        element: <DashboardProfile></DashboardProfile>,
      },
      {
        path: "*",
        element: <NotFindPage></NotFindPage>,
      },
    ],
  },
]);

export default router;
