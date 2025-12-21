import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { AuthContext } from "../../provider/AuthProvider";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/requests/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  const handleDonate = async () => {
    try {
      const res = await axiosSecure.patch(`/requests/donate/${id}`, {
        donorName: user.displayName,
        donorEmail: user.email,
      });
      if (res.data.modifiedCount > 0) {
        setRequest({ ...request, status: "inprogress" });
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/donation-requests");
    }
  };

  if (loading) return <Loader />;
  if (!request)
    return (
      <p className="text-gray-600 text-center mt-10 font-semibold">
        Request not found
      </p>
    );

  const dateObj = new Date(request.donationDate);
  const formattedDate = dateObj.toLocaleDateString("en-GB");

  const [h, m] = request.donationTime.split(":");
  const timeObj = new Date();
  timeObj.setHours(h, m);
  const formattedTime = timeObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="p-1 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#05b4cd]">
        Donation Request Details
      </h2>

      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Recipient:</span>{" "}
              {request.recipientName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Location:</span>{" "}
              {request.recipientDistrict}, {request.recipientUpazila}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Date:</span>{" "}
              {formattedDate}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Time:</span>{" "}
              {formattedTime}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Blood Group:</span>{" "}
              {request.bloodGroup}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-md font-medium ${
                  request.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : request.status === "inprogress"
                    ? "bg-blue-100 text-blue-800"
                    : request.status === "done"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {request.status}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Notes:</span>{" "}
              {request.requestMessage || "N/A"}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-3">
          <button
            onClick={handleBack}
            className="btn bg-[#05b4cd] text-white w-full md:w-auto text-center"
          >
            Back
          </button>

          {request.status === "pending" &&
            user?.email !== request.requesterEmail && (
              <button
                onClick={() => setOpen(true)}
                className="btn bg-[#05b4cd] text-white w-full md:w-auto"
              >
                Donate
              </button>
            )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-[#05b4cd]">
              Confirm Donation
            </h3>

            <div className="space-y-3">
              <input
                value={user.displayName}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="btn btn-sm">
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="btn btn-sm bg-[#05b4cd] text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
