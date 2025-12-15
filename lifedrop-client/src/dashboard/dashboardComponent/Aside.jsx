import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { IoHomeOutline } from "react-icons/io5";
import { MdAddToPhotos, MdDashboard, MdOutlineBorderAll } from "react-icons/md";
import { Link, NavLink } from "react-router";

const Aside = () => {
  return (
    <aside className="w-64 min-h-screen primary text-white p-4">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        {" "}
        <MdDashboard />
        Dashboard
      </h2>

      <div className="flex flex-col justify-between min-h-[calc(100vh-85px)]">
        <nav className="space-y-2">
          <NavLink to="/dashboard" className="flex items-center gap-2 ">
            <IoHomeOutline /> Home
          </NavLink>
          <hr />
          <NavLink to="/dashboard/profile" className="flex items-center gap-2 ">
            <ImProfile /> Profile
          </NavLink>
          <hr />
          <>
            <NavLink
              to="/dashboard/my-donation-requests"
              className=" flex items-center gap-2 "
            >
              <FaCodePullRequest /> My Requests
            </NavLink>
            <hr />
            <NavLink
              to="/dashboard/create-donation-request"
              className="flex items-center gap-2 "
            >
              <MdAddToPhotos /> Create Request
            </NavLink>
          </>
          <hr />
          <NavLink
            to="/dashboard/all-blood-donation-request"
            className="flex items-center gap-2 "
          >
            <MdOutlineBorderAll /> All Requests
          </NavLink>
          <hr />
          <NavLink
            to="/dashboard/all-users"
            className="flex items-center gap-2 "
          >
            <FaUsers /> All Users
          </NavLink>
        </nav>

        <div className="flex justify-between items-center">
          <FaUserCircle className="text-5xl" />
          <Link className=" btn ">
            Logout
            <CiLogout />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
