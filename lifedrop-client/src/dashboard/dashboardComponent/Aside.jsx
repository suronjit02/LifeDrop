import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { IoHomeOutline } from "react-icons/io5";
import { MdAddToPhotos, MdDashboard, MdOutlineBorderAll } from "react-icons/md";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";

const Aside = ({ isOpen, setOpen }) => {
  const { user, logOut } = useContext(AuthContext);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded ${
      isActive ? "bg-white text-[#05b4cd]" : "hover:bg-white/20"
    }`;

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 w-64 min-h-screen
        bg-[#05b4cd] text-white p-4 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300`}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MdDashboard /> Dashboard
        </h2>

        <div className="flex flex-col justify-between min-h-[calc(100vh-85px)]">
          <nav className="space-y-2">
            <NavLink to="/dashboard" end className={linkClass}>
              <IoHomeOutline /> Home
            </NavLink>

            <NavLink to="/dashboard/profile" className={linkClass}>
              <ImProfile /> Profile
            </NavLink>

            <NavLink to="/dashboard/my-requests" className={linkClass}>
              <FaCodePullRequest /> My Requests
            </NavLink>

            <NavLink to="/dashboard/create-request" className={linkClass}>
              <MdAddToPhotos /> Create Request
            </NavLink>

            <NavLink to="/dashboard/all-requests" className={linkClass}>
              <MdOutlineBorderAll /> All Requests
            </NavLink>

            <NavLink to="/dashboard/all-users" className={linkClass}>
              <FaUsers /> All Users
            </NavLink>
          </nav>

          <div className="flex items-center justify-between mt-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border"
              />
            ) : (
              <FaUserCircle className="text-4xl" />
            )}
            <Link to={"/"}>
              <img
                className="h-8 rounded-sm "
                src="/lifedrop.jpeg"
                alt="LifeDrop"
              />
            </Link>
            <Link onClick={logOut} to="/" className="btn btn-sm">
              Logout <CiLogout />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
