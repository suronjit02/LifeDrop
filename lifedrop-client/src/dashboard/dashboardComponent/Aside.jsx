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

const Aside = ({ isOpen, setOpen }) => {
  const { user, logOut, role } = useContext(AuthContext);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded ${
      isActive ? "bg-white text-[#05b4cd]" : "hover:bg-white/20"
    }`;

  // console.log("User Information: ", user);
  // console.log("User Role: ", role);

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
        {/* title */}
        <Link
          to={"/"}
          className="mb-6 text-xl text-secondary font-bold flex items-center gap-2 bg-white border border-gray-300 p-2 rounded-sm"
        >
          <span>
            <img className="h-8" src={logo} alt="LifeDrop Logo" />
          </span>{" "}
          <span>
            Life<span className="text-primary">Drop</span>
          </span>
        </Link>

        {/* nav links */}
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

          {/* down part */}
          <div className="space-y-3 my-4">
            {/* information */}
            <div className="flex items-center gap-2 rounded-sm">
              {user?.photoURL ? (
                <div>
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="h-12 rounded-full object-cover cursor-pointer border"
                  />
                  {/* <h3 className="capitalize font-bold ">{role}</h3> */}
                </div>
              ) : (
                <FaUserCircle className="text-4xl" />
              )}

              {/* name and email */}
              <div className="">
                <p className="text-md font-bold">{user.displayName}</p>
                <p className="text-sm ">{user.email}</p>
              </div>
            </div>

            {/* logout button */}
            <Link onClick={logOut} to="/" className="btn btn-sm w-full">
              Logout <CiLogout />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
