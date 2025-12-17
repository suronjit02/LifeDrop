import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-0 md:px-30">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to={"/"}>
          <img className="h-10 " src="/lifedrop.jpeg" alt="LifeDrop" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex w-100 max-w-100">
        <ul className="flex justify-center items-center gap-5 font-semibold">
          <li>
            <NavLink>Donation Requests</NavLink>
          </li>
          <li>
            <NavLink>Search</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <HiOutlineUserCircle className="text-3xl text-gray-700 cursor-pointer" />
                )}
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content  bg-base-100 rounded-md z-1 min-w-55 p-2 shadow-sm"
              >
                <div className="text-sm mt-4">
                  <li>Name: {user.displayName}</li>
                  <li>Email: {user.email}</li>
                  <hr className="my-3" />
                  <li>
                    <Link
                      to={"/dashboard"}
                      className=" text-primary font-semibold mb-3"
                    >
                      Dashboard
                    </Link>
                  </li>
                </div>
                <li>
                  <Link
                    to={"/"}
                    onClick={handleLogOut}
                    className="text-primary font-semibold "
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <Link onClick={handleLogOut} className="btn primary text-white">
              LogOut
            </Link>{" "}
          </>
        ) : (
          <Link to={"/login"} className="btn primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
