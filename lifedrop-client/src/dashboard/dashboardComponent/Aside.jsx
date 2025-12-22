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
  const { user, logOut, role } = useContext(AuthContext);
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
        <div className="mb-6 flex  justify-between items-center">
          <h2 className="text-xl font-bold  flex items-center gap-2">
            <MdDashboard /> Dashboard
          </h2>
          <Link to={"/"}>
            <img
              className="h-6 rounded-xs "
              src="/lifedrop.jpeg"
              alt="LifeDrop"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-between min-h-[calc(100vh-85px)]">
          <nav className="space-y-2">
            <NavLink to="/dashboard" end className={linkClass}>
              <IoHomeOutline /> Home
            </NavLink>

            <NavLink to="/dashboard/profile" className={linkClass}>
              <ImProfile /> Profile
            </NavLink>

            {role === "donor" && (
              <>
                <NavLink to="/dashboard/my-requests" className={linkClass}>
                  <FaCodePullRequest /> My Donation Requests
                </NavLink>

                <NavLink to="/dashboard/create-request" className={linkClass}>
                  <MdAddToPhotos /> Create Donation Request
                </NavLink>
              </>
            )}

            {(role === "volunteer" || role === "admin") && (
              <NavLink to="/dashboard/all-requests" className={linkClass}>
                <MdOutlineBorderAll /> All Donation Requests
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink to="/dashboard/all-users" className={linkClass}>
                <FaUsers /> All Users
              </NavLink>
            )}
          </nav>

          <div className="flex items-center justify-between mt-6">
            {user?.photoURL ? (
              <div>
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer border"
                />
                <h3 className="capitalize font-bold ">{role}</h3>
              </div>
            ) : (
              <FaUserCircle className="text-4xl" />
            )}
            <div className="">
              <Link onClick={logOut} to="/" className="btn btn-sm">
                Logout <CiLogout />
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
