import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Loader from "../../components/Loader";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/role/${user.email}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  if (!userData) return <Loader></Loader>;

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-[#05b4cd] mb-6">My Profile</h2>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          {userData?.mainPhotoUrl ? (
            <img
              src={userData.mainPhotoUrl}
              alt="profile"
              className="w-25 h-25 rounded-full object-cover cursor-pointer border-2 border-[#05b4cd]"
            />
          ) : (
            <HiOutlineUserCircle className="text-7xl text-gray-700 cursor-pointer" />
          )}
          <h3 className="text-xl font-semibold mt-2">{userData.name}</h3>
          <p className="text-gray-600">{userData.email}</p>
        </div>

        <div className="mt-6 space-y-2">
          <p>
            <span className="font-semibold">Blood Group:</span> {userData.blood}
          </p>
          <p>
            <span className="font-semibold">District:</span> {userData.district}
          </p>
          <p>
            <span className="font-semibold">Upazila:</span> {userData.upazila}
          </p>
          <p>
            <span className="font-semibold">
              Role:{" "}
              {userData.role === "admin" ? (
                <span className="text-primary">Admin</span>
              ) : userData.role === "volunteer" ? (
                <span className="text-[#00684d]">Volunteer</span>
              ) : userData.role === "donor" ? (
                <span className="text-[#05b4cd]">Donor</span>
              ) : (
                "User"
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
