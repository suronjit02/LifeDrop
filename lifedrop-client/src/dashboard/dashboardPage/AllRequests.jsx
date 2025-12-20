import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [itemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const statusQuery = statusFilter ? `&status=${statusFilter}` : "";
    axiosSecure
      .get(
        `/all-requests?page=${
          currentPage - 1
        }&size=${itemPerPage}${statusQuery}`
      )
      .then((res) => {
        setMyRequests(res.data.request);
        setTotalRequests(res.data.totalRequest);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, currentPage, itemPerPage, statusFilter]);

  const numberOfPages = Math.ceil(totalRequests / itemPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-1 px-0 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-[#05b4cd]">
          All Donation Requests
        </h2>

        <div className="mb-4">
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
      </div>

      {myRequests.length === 0 ? (
        <p className="text-gray-500">No donation request found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((req, index) => {
                  const dateObj = new Date(req.donationDate);
                  const formattedDate = dateObj.toLocaleDateString("en-GB");

                  const [hours, minutes] = req.donationTime.split(":");
                  const timeObj = new Date();
                  timeObj.setHours(Number(hours), Number(minutes));
                  const formattedTime = timeObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <tr key={req._id}>
                      <td>{(currentPage - 1) * itemPerPage + index + 1}</td>
                      <td className="font-bold ">{req.recipientName}</td>
                      <td>
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
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

            {pages.map((page) => (
              <button
                key={page}
                className={`btn btn-sm ${
                  currentPage === page ? "bg-[#05b4cd] text-white" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
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
