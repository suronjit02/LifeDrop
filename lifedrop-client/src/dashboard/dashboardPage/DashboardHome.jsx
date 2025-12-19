import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FaUsers } from "react-icons/fa";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { RiRefund2Fill } from "react-icons/ri";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, role } = useContext(AuthContext);

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setTotalUsers(res.data.length));
  }, [axiosSecure]);

  useEffect(() => {
    if (role === "admin" || role === "volunteer") {
      axiosSecure
        .get("/all-request")
        .then((res) => setTotalRequests(res.data.length));
    }
  }, [axiosSecure, role]);

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=0&size=3`)
      .then((res) => {
        setRecentRequests(res.data.request);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-1 md:p-6">
      <div className="bg-[#05b4cd] p-5 rounded-sm mb-6">
        <h1 className="text-2xl md:text-3xl font-bold  text-white">
          Welcome, {user?.displayName || "User"}!
        </h1>
      </div>

      {(role === "admin" || role === "volunteer") && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 border border-[#05b4cd] rounded-md  hover:shadow-md transition-shadow duration-300 flex flex-col justify-center items-center">
              <FaUsers className="text-4xl  text-gray-500 " />
              <h3 className="text-2xl font-bold badge badge-soft rounded-2xl text-sky-900 p-4 my-3">
                {totalUsers}
              </h3>

              <p className="text-sky-900 text-md font-bold">Total User</p>
            </div>

            <div className="bg-white p-5 border border-[#05b4cd] rounded-md  hover:shadow-md transition-shadow duration-300 flex flex-col justify-center items-center">
              <VscGitPullRequestGoToChanges className="text-4xl  text-yellow-500 " />
              <h3 className="text-2xl font-bold badge badge-error p-4 rounded-2xl text-white my-3">
                {totalRequests}
              </h3>
              <p className="text-sky-900 text-md font-bold">Total Request</p>
            </div>

            <div className="bg-white p-5 border border-[#05b4cd] rounded-md  hover:shadow-md transition-shadow duration-300 flex flex-col justify-center items-center">
              <RiRefund2Fill className="text-4xl  text-[#00684d] " />
              <h3 className="text-2xl font-bold badge badge-success rounded-2xl text-white p-4 my-3">
                2455 $
              </h3>
              <p className="text-sky-900 text-md font-bold">Total Funding</p>
            </div>
          </div>
        </>
      )}

      {role === "donor" && (
        <>
          {recentRequests.length > 0 && (
            <>
              <h2 className="text-lg md:text-2xl font-semibold mb-4">
                Recent Donation Requests
              </h2>

              <div className="overflow-x-auto border border-[#05b4cd] rounded-sm">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Recipient</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Blood Group</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((req, index) => {
                      const dateObj = new Date(req.donationDate);
                      const formattedDate = dateObj.toLocaleDateString("en-GB");
                      const [hours, minutes] = req.donationTime.split(":");
                      const timeObj = new Date();
                      timeObj.setHours(Number(hours), Number(minutes));
                      const formattedTime = timeObj.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      );

                      return (
                        <tr key={req._id}>
                          <td>{index + 1}</td>
                          <td>{req.recipientName}</td>
                          <td>
                            {req.recipientDistrict}, {req.recipientUpazila}
                          </td>
                          <td>{formattedDate}</td>
                          <td>{formattedTime}</td>
                          <td>{req.bloodGroup}</td>
                          <td>
                            <span
                              className={`badge rounded-sm ${
                                req.status === "pending"
                                  ? "badge-warning"
                                  : req.status === "inprogress"
                                  ? "badge-info"
                                  : req.status === "done"
                                  ? "badge-success"
                                  : "badge-error"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="flex gap-2">
                            {req.status === "inprogress" && (
                              <>
                                <button className="btn btn-xs btn-success">
                                  Done
                                </button>
                                <button className="btn btn-xs btn-error">
                                  Cancel
                                </button>
                              </>
                            )}
                            <button className="btn btn-xs btn-info">
                              View
                            </button>
                            <button className="btn btn-xs btn-warning">
                              Edit
                            </button>
                            <button className="btn btn-xs btn-outline btn-error">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-right">
                <Link
                  to={"/dashboard/my-requests"}
                  className="btn bg-[#05b4cd] text-white"
                >
                  View All Requests
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardHome;
