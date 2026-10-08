import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaCodePullRequest, FaUsers } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { IoHomeOutline } from "react-icons/io5";
import { MdAddToPhotos, MdOutlineBorderAll } from "react-icons/md";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import logo from "/icon.png";
import { BiSearch } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";

const Aside = ({ isOpen, setOpen }) => {
  const { user, logOut, role } = useContext(AuthContext);

  /* active  → white bg + primary red text
     inactive → white/20 bg on hover + white text */
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-white text-primary shadow-sm font-semibold"
        : "text-white/80 hover:bg-white/15 hover:text-white"
    }`;

  const plainLinkClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/15 hover:text-white transition-all duration-200";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 w-64 min-h-screen
          flex flex-col
          bg-secondary text-white border-r-2 border-gray-400
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="flex px-5 py-5 border-b border-white/20">
          <Link
            to="/"
            className="flex justify-center w-full bg-white p-2 rounded-md"
          >
            <span className="font-bold text-lg text-secondary">
              Life<span className="text-primary">Drop</span>
            </span>
          </Link>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-white/20">
          <span className="text-xs uppercase tracking-widest font-semibold text-white/50">
            {role || "User"} panel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <NavLink to="/dashboard" end className={linkClass}>
            <IoHomeOutline className="text-base shrink-0" />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass}>
            <ImProfile className="text-base shrink-0" />
            Profile
          </NavLink>

          {role === "donor" && (
            <>
              <NavLink to="/dashboard/my-requests" className={linkClass}>
                <FaCodePullRequest className="text-base shrink-0" />
                My Requests
              </NavLink>
              <NavLink to="/dashboard/create-request" className={linkClass}>
                <MdAddToPhotos className="text-base shrink-0" />
                Create Request
              </NavLink>
            </>
          )}

          {(role === "volunteer" || role === "admin") && (
            <NavLink to="/dashboard/all-requests" className={linkClass}>
              <MdOutlineBorderAll className="text-base shrink-0" />
              All Requests
            </NavLink>
          )}

          {role === "admin" && (
            <NavLink to="/dashboard/all-users" className={linkClass}>
              <FaUsers className="text-base shrink-0" />
              All Users
            </NavLink>
          )}

          {/* Separator */}
          <div className="pt-4 mt-4 border-t border-white/20">
            <p className="text-xs uppercase tracking-widest font-semibold text-white/40 px-3 mb-2">
              General
            </p>
            <Link to="/donation-requests" className={plainLinkClass}>
              <FiGlobe className="text-base shrink-0" />
              Public Requests
            </Link>
            <Link to="/search-donors" className={plainLinkClass}>
              <BiSearch className="text-base shrink-0" />
              Find Donors
            </Link>
          </div>
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-white/20">
          <div className="flex items-center gap-3 mb-3 px-1">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-white/40 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <FaUserCircle className="text-white/70 text-xl" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-white/50 truncate">{user?.email}</p>
            </div>
          </div>

          <Link
            onClick={logOut}
            to="/"
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-primary text-white border border-white/20 hover:border-white transition-all duration-300"
          >
            <CiLogout className="text-base" />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Aside;
