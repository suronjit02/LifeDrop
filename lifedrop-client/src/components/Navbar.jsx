import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { HiOutlineUserCircle } from "react-icons/hi";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { RxDropdownMenu } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user, axiosSecure]);
  // console.log(userData);

  return (
    <nav className="navbar h-20 bg-base-100 shadow-sm sticky top-0 z-50">
      <div className=" flex justify-between gap-10 items-center px-2 w-full max-w-7xl mx-auto">
        {/* nav start */}
        <div className=" ">
          <div className="hidden md:flex items-center">
            <Link to={"/"}>
              <img className="h-10" src="/lifedrop.png" alt="LifeDrop" />
            </Link>
          </div>

          {/* dropdown small device start nav */}
          <div className="md:hidden flex items-center justify-start gap-2">
            <div className="dropdown">
              <div tabIndex={0} role="button" className=" m-1">
                <HiOutlineBars3 className=" text-3xl " />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>

                <li>
                  <NavLink to={"/donation-requests"}>Donation Requests</NavLink>
                </li>
                <li>
                  <NavLink to={"/search-donors"}>Search Donors</NavLink>
                </li>
                <li>
                  <NavLink to={"/donate"}>Donate</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>

                <li>
                  <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button" className=" m-1">
                      Others
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                      <li>
                        <NavLink to={"/faq"}>FAQ</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/charity"}>Charity</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/terms-&-condition"}>
                          Terms & Condition
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <Link to={"/"}>
              <img className="h-8" src="/comonlogo.png" alt="LifeDrop" />
            </Link>
          </div>
        </div>

        {/* nav center */}
        <div className=" hidden md:flex justify-end w-full">
          <ul className="flex justify-center items-center gap-8">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
              </li>
            )}
            <li>
              <NavLink to={"/donation-requests"}>Donation Requests</NavLink>
            </li>
            <li>
              <NavLink to={"/search-donors"}>Search Donors</NavLink>
            </li>

            <li>
              <NavLink to={"/donate"}>Donate</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"/faq"}>FAQ</NavLink>
            </li>
          </ul>
        </div>

        {/* nav end */}
        <div className="flex w-15 items-center justify-end gap-2">
          {user ? (
            <>
              <Link to={"/dashboard/profile"}>
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
              </Link>
            </>
          ) : (
            <Link
              to={"/login"}
              className="loginLogoutBtn btn primary text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
