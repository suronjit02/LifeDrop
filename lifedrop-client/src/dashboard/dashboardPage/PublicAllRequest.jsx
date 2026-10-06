import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { AuthContext } from "../../provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiCalendar, FiClock, FiMapPin, FiEye } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

const bloodGroupColor = (bg) => {
  const map = {
    "A+": "bg-red-50 text-red-600 border-red-200",
    "A-": "bg-red-50 text-red-700 border-red-200",
    "B+": "bg-orange-50 text-orange-600 border-orange-200",
    "B-": "bg-orange-50 text-orange-700 border-orange-200",
    "O+": "bg-blue-50 text-blue-600 border-blue-200",
    "O-": "bg-blue-50 text-blue-700 border-blue-200",
    "AB+": "bg-purple-50 text-purple-600 border-purple-200",
    "AB-": "bg-purple-50 text-purple-700 border-purple-200",
  };
  return map[bg] || "bg-gray-100 text-gray-700 border-gray-200";
};

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

  const handleView = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/dashboard/donation-request-details/${id}`, {
        state: { from: "/donation-requests" },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="primary py-14 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BiSolidDonateBlood className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Pending Donation Requests
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
            Someone needs your blood today. Browse open requests and be the
            reason someone survives.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Empty state */}
        {requests.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BiSolidDonateBlood className="text-6xl text-gray-200 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-1">
              No pending requests right now
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              Check back later — new requests are added regularly.
            </p>
          </motion.div>
        )}

        {/* Results count */}
        {requests.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 text-sm">
              <span className="text-[#c6414c] font-bold text-base">
                {requests.length}
              </span>{" "}
              {requests.length === 1 ? "request" : "requests"} waiting for a
              donor
            </p>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {requests.map((req, index) => {
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
                <motion.div
                  key={req._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Top accent bar */}
                  <div className="primary h-1.5 w-full flex-shrink-0" />

                  <div className="p-5 flex flex-col flex-1">
                    {/* Recipient + Blood Group */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Recipient
                        </p>
                        <h4 className="font-semibold text-gray-800 text-base truncate">
                          {req.recipientName}
                        </h4>
                      </div>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full border flex-shrink-0 ${bloodGroupColor(req.bloodGroup)}`}
                      >
                        {req.bloodGroup}
                      </span>
                    </div>

                    <hr className="border-gray-100 mb-4" />

                    {/* Info rows */}
                    <div className="flex flex-col gap-2 text-sm text-gray-600 flex-1">
                      <div className="flex items-center gap-2">
                        <FaLocationDot className="text-[#c6414c] flex-shrink-0" />
                        <span className="truncate">
                          {req.recipientDistrict}, {req.recipientUpazila}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-[#c6414c] flex-shrink-0" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-[#c6414c] flex-shrink-0" />
                        <span>{formattedTime}</span>
                      </div>
                    </div>

                    {/* Status + Action */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 capitalize">
                        {req.status}
                      </span>
                      <button
                        onClick={() => handleView(req._id)}
                        className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white transition-all duration-300 flex items-center gap-1"
                      >
                        <FiEye />
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PublicAllRequest;
