import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Loader from "../../components/Loader";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaEdit, FaSave } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const DashboardProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => {
        setUserData(res.data);
        setFormData(res.data);
      });
    }
  }, [user, axiosSecure]);
  console.log(userData);
  if (!userData) return <Loader />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { _id, ...data } = formData;
      // console.log(data);
      const res = await axiosSecure.patch("/update/profile", data);
      // console.log(res.data);
      setUserData(res.data);
      setFormData(res.data);
      setIsEdit(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#05b4cd]">My Profile</h2>

        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="btn btn-sm bg-[#05b4cd] text-white"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-sm btn-success text-white"
          >
            <FaSave /> Save
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-md p-6 grid md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center border-r">
          {userData?.mainPhotoUrl ? (
            <img
              src={userData.mainPhotoUrl}
              alt="profile"
              className="w-32 h-32 rounded-full border-3 border-[#05b4cd] object-cover"
            />
          ) : (
            <HiOutlineUserCircle className="text-8xl text-gray-400" />
          )}
          <p className="mt-3 font-semibold">{userData.name}</p>
          <p className=" text-gray-500">{userData.email}</p>
          <span
            className={`badge mt-1 rounded-sm capitalize ${
              userData.role === "admin"
                ? "bg-[#c6414c] text-white"
                : userData.role === "volunteer"
                ? "bg-[#00684d] text-white"
                : "bg-[#05b4cd] text-white"
            }`}
          >
            {userData.role}
          </span>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              value={formData.email || ""}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select
              name="blood"
              value={formData.blood || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="select select-bordered w-full"
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label className="label">District</label>
            <input
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Upazila</label>
            <input
              name="upazila"
              value={formData.upazila || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <img className="h-10" src="/lifedrop.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
