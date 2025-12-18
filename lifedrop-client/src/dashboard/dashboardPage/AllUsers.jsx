import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fetchUsers();
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto md:overflow-visible rounded-md border border-[#05b4cd]">
        <table className="table w-full ">
          <thead>
            <tr className="bg-[#05b4cd] text-white ">
              <th>#</th>
              <th>User</th>

              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img
                          src={user?.mainPhotoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="capitalize">{user.role}</td>
                <td className="capitalize">{user.status}</td>

                <td className="text-center">
                  <div className="dropdown dropdown-end z-50">
                    <label tabIndex={0} className="btn btn-ghost btn-sm">
                      ⋮
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44"
                    >
                      <li>
                        {user.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(user.email, "blocked")
                            }
                          >
                            Block User
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(user.email, "active")
                            }
                          >
                            Unblock User
                          </button>
                        )}
                      </li>

                      <li>
                        <button>Make Volunteer</button>
                      </li>

                      <li>
                        <button>Make Admin</button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
