import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardProfile from "../dashboard/dashboardPage/DashboardProfile";
import NotFindPage from "../pages/NotFindPage";
import DashboardHome from "../dashboard/dashboardPage/DashboardHome";
import MyRequests from "../dashboard/dashboardPage/MyRequests";
import CreateRequest from "../dashboard/dashboardPage/CreateRequest";
import AllRequests from "../dashboard/dashboardPage/AllRequests";
import AllUsers from "../dashboard/dashboardPage/AllUsers";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
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
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <DashboardProfile />,
      },
      {
        path: "my-requests",
        element: <MyRequests />,
      },
      {
        path: "create-request",
        element: <CreateRequest />,
      },
      {
        path: "all-requests",
        element: <AllRequests />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "*",
        element: <NotFindPage></NotFindPage>,
      },
    ],
  },
]);

export default router;
