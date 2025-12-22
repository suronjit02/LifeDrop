import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { HiOutlineUserCircle } from "react-icons/hi";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user, axiosSecure]);
  console.log(userData);

  const handleLogOut = () => {
    logOut();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-30">
      <div className="navbar-start">
        <Link to={"/"}>
          <img className="h-10 " src="/lifedrop.jpeg" alt="LifeDrop" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex w-100 max-w-100">
        <ul className="flex justify-center items-center gap-5 font-semibold">
          <li>
            <NavLink to={"/donation-requests"}>Donation Requests</NavLink>
          </li>
          <li className="border-x-2 px-2">
            <NavLink to={"/search-donors"}>Search Donors</NavLink>
          </li>
          <li>
            <NavLink to={"/donate"}>Donate</NavLink>
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
                <div className="text-sm text-center mt-4">
                  <li>
                    <Link
                      to={"/dashboard"}
                      className=" btn hover:bg-amber-100 bg-amber-50 px-20 py-2 rounded-sm text-primary font-semibold border-none mb-2"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/"}
                      onClick={handleLogOut}
                      className="btn hover:bg-amber-100 bg-amber-50 px-23 py-2 rounded-sm text-primary font-semibold border-none"
                    >
                      Logout
                    </Link>
                  </li>

                  <hr className="my-3 " />

                  <div className="text-center">
                    <li className="font-semibold">{userData.name}</li>
                    <li>{userData.email}</li>
                  </div>
                </div>
              </ul>
            </div>

            <div className="hidden md:flex">
              <Link
                to={"/"}
                onClick={handleLogOut}
                className=" btn primary  text-white font-semibold "
              >
                Logout
              </Link>
            </div>
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
