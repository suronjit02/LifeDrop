import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { AuthContext } from "../../provider/AuthProvider";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [itemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const statusQuery = statusFilter ? `&status=${statusFilter}` : "";
      const res = await axiosSecure.get(
        `/all-requests?page=${
          currentPage - 1
        }&size=${itemPerPage}${statusQuery}`
      );
      setRequests(res.data.request);
      setTotalRequests(res.data.totalRequest);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, [axiosSecure, currentPage, itemPerPage, statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/requests/status/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      fetchAllRequests();
    }
  };

  const handleDeleteRequest = async (id) => {
    const res = await axiosSecure.delete(`/requests/${id}`);
    if (res.data.deletedCount > 0) {
      fetchAllRequests();
    }
  };

  const numberOfPages = Math.ceil(totalRequests / itemPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

  if (loading) return <Loader />;

  return (
    <div className="p-1 px-0 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <h2 className="text-lg md:text-2xl font-bold text-[#05b4cd]">
          All Donation Requests
        </h2>

        <select
          className="select select-bordered w-full md:w-48"
          value={statusFilter}
          onChange={(e) => {
            setCurrentPage(1);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-500">No donation request found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => {
                  const date = new Date(req.donationDate).toLocaleDateString(
                    "en-GB"
                  );

                  const [h, m] = req.donationTime.split(":");
                  const time = new Date();
                  time.setHours(h, m);

                  return (
                    <tr key={req._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className="font-semibold">{req.recipientName}</td>
                      <td>
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>
                      <td>{date}</td>
                      <td>
                        {time.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        <span
                          className={`badge ${
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
                      <td className="flex gap-2 flex-wrap">
                        {req.status === "inprogress" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, "done")
                              }
                              className="btn btn-xs btn-success"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, "canceled")
                              }
                              className="btn btn-xs btn-error"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <Link
                          to={`/dashboard/donation-request-details/${req._id}`}
                          state={{ from: window.location.pathname }}
                          className="btn btn-xs btn-info"
                        >
                          View
                        </Link>

                        {role === "admin" && (
                          <>
                            <Link
                              to={`/dashboard/edit-donation-request/${req._id}`}
                              className="btn btn-xs btn-warning"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDeleteRequest(req._id)}
                              className="btn btn-xs btn-outline btn-error"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {pages.map((p) => (
              <button
                key={p}
                className={`btn btn-sm ${
                  currentPage === p ? "bg-[#05b4cd] text-white" : ""
                }`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={currentPage === numberOfPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRequests;
