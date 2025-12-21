import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { AuthContext } from "../../provider/AuthProvider";

const PublicAllRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get("/public/requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <Loader />;

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 font-semibold text-gray-700">
        No pending donation requests
      </p>
    );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#05b4cd]">
        Pending Donation Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-[#05b4cd] text-white">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const dateObj = new Date(req.donationDate);
              const formattedDate = dateObj.toLocaleDateString("en-GB");

              const [h, m] = req.donationTime.split(":");
              const timeObj = new Date();
              timeObj.setHours(h, m);
              const formattedTime = timeObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td>{req.bloodGroup}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>
                    <span className="badge badge-warning rounded-md">
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate("/login");
                        } else {
                          navigate(
                            `/dashboard/donation-request-details/${req._id}`,
                            {
                              state: { from: "/donation-requests" },
                            }
                          );
                        }
                      }}
                      className="btn btn-sm bg-[#05b4cd] text-white"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicAllRequest;
