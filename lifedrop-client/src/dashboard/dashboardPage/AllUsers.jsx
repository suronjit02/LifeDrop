import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch users");
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-hidden rounded-md border border-[#05b4cd]">
        <table className="table w-full  ">
          <thead>
            <tr className="bg-[#05b4cd] text-white ">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td className="font-semibold">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
