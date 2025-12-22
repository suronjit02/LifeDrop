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
import PrivateRoute from "../provider/PrivateRoutes";
import AuthProvider from "../provider/AuthProvider";
import AdminRouter from "../provider/AdminRouter";
import DonorRouter from "../provider/DonorRouter";
import VolunteerAdminRouter from "../provider/VolunteerAdminRouter";
import DonationRequestDetails from "../dashboard/dashboardPage/DonationRequestDetails";
import PublicAllRequest from "../dashboard/dashboardPage/PublicAllRequest";
import SearchPage from "../dashboard/dashboardPage/SearchPage";
import EditRequest from "../dashboard/dashboardPage/EditRequest";

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
        path: "/donation-requests",
        element: <PublicAllRequest></PublicAllRequest>,
      },
      {
        path: "/search-donors",
        element: <SearchPage></SearchPage>,
      },

      {
        path: "*",
        element: <NotFindPage></NotFindPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),

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
        element: (
          <DonorRouter>
            <MyRequests />
          </DonorRouter>
        ),
      },
      {
        path: "create-request",
        element: (
          <DonorRouter>
            <CreateRequest />
          </DonorRouter>
        ),
      },
      {
        path: "all-requests",
        element: (
          <VolunteerAdminRouter>
            <AllRequests />
          </VolunteerAdminRouter>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRouter>
            <AllUsers />
          </AdminRouter>
        ),
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-donation-request/:id",
        element: (
          <PrivateRoute>
            <EditRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFindPage></NotFindPage>,
      },
    ],
  },
]);

export default router;
