import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { FaUsers } from "react-icons/fa";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { RiRefund2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiTrendingUp,
  FiActivity,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

/* ─────────────────────────── helpers ─────────────────────────── */

const statusStyle = {
  pending:    "bg-amber-50 text-amber-600 border-amber-200",
  inprogress: "bg-[#05b4cd]/10 text-[#05b4cd] border-[#05b4cd]/30",
  done:       "bg-green-50 text-green-600 border-green-200",
  canceled:   "bg-red-50 text-[#c6414c] border-red-200",
};

const bloodGroupColor = (bg) => {
  const map = {
    "A+":  "bg-red-50 text-red-600 border-red-200",
    "A-":  "bg-red-50 text-red-700 border-red-200",
    "B+":  "bg-orange-50 text-orange-600 border-orange-200",
    "B-":  "bg-orange-50 text-orange-700 border-orange-200",
    "O+":  "bg-blue-50 text-blue-600 border-blue-200",
    "O-":  "bg-blue-50 text-blue-700 border-blue-200",
    "AB+": "bg-purple-50 text-purple-600 border-purple-200",
    "AB-": "bg-purple-50 text-purple-700 border-purple-200",
  };
  return map[bg] || "bg-gray-100 text-gray-700 border-gray-200";
};

/* ─────────────────────── Stat card component ──────────────────── */
function StatCard({ icon, label, value, sub, iconBg, iconColor, delay }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {sub && (
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
            <FiTrendingUp className="text-green-500" />
            {sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Quick-link card component ─────────────── */
function QuickLink({ to, icon, title, desc, iconBg, iconColor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md hover:border-[#05b4cd]/30 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
            {icon}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{title}</p>
            <p className="text-xs text-gray-400">{desc}</p>
          </div>
        </div>
        <FiArrowRight className="text-gray-300 group-hover:text-[#05b4cd] group-hover:translate-x-1 transition-all duration-200" />
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════ Main Page ════════════════════════════ */
const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, role } = useContext(AuthContext);

  const [recentRequests, setRecentRequests]   = useState([]);
  const [allRequests, setAllRequests]         = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [totalUsers, setTotalUsers]           = useState(0);
  const [totalRequests, setTotalRequests]     = useState(0);
  const [userData, setUserData]               = useState({});

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setTotalUsers(res.data.length));
  }, [axiosSecure]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => setUserData(res.data));
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    if (role === "admin" || role === "volunteer") {
      axiosSecure.get("/all-request").then((res) => {
        const data = res.data;
        setTotalRequests(data.length);
        // keep the 5 most recent for the activity feed
        setAllRequests(data.slice(0, 5));
      });
    }
  }, [axiosSecure, role]);

  useEffect(() => {
    axiosSecure
      .get("/my-request?page=0&size=3")
      .then((res) => {
        setRecentRequests(res.data.request);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/requests/status/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      setRecentRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req)),
      );
    }
  };

  const handleDeleteRequest = async (id) => {
    const res = await axiosSecure.delete(`/requests/${id}`);
    if (res.data.deletedCount > 0) {
      setRecentRequests((prev) => prev.filter((req) => req._id !== id));
    }
  };

  if (loading) return <Loader />;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  /* pending count for donor badge */
  const pendingCount = recentRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-full bg-gray-50 rounded-xl p-4 md:p-8">

      {/* ════════════ Welcome Banner ════════════ */}
      <motion.div
        className="relative bg-[#05b4cd] rounded-3xl p-7 mb-8 overflow-hidden"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* decorative circles */}
        <div className="absolute right-0 top-0 h-full w-72 pointer-events-none opacity-10">
          <div className="absolute -top-6 -right-6 w-48 h-48 rounded-full bg-white" />
          <div className="absolute bottom-0 right-16 w-32 h-32 rounded-full bg-white" />
          <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-[#c6414c]" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            {userData?.mainPhotoUrl || user?.photoURL ? (
              <img
                src={userData?.mainPhotoUrl || user?.photoURL}
                alt="avatar"
                className="w-16 h-16 rounded-2xl object-cover border-3 border-white/40 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <BiSolidDonateBlood className="text-white text-3xl" />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-0.5">
                {greeting()}
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {userData?.name || user?.displayName || "User"}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold px-3 py-0.5 rounded-full bg-[#c6414c] text-white capitalize">
                  {role}
                </span>
                {role === "donor" && pendingCount > 0 && (
                  <span className="text-xs font-semibold px-3 py-0.5 rounded-full bg-white/20 text-white">
                    {pendingCount} pending
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          {role === "donor" && (
            <Link
              to="/dashboard/create-request"
              className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent rounded-xl gap-2 transition-all duration-300 self-start sm:self-auto"
            >
              <BiSolidDonateBlood /> New Request
            </Link>
          )}
          {(role === "admin" || role === "volunteer") && (
            <Link
              to="/dashboard/all-requests"
              className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent rounded-xl gap-2 transition-all duration-300 self-start sm:self-auto"
            >
              <VscGitPullRequestGoToChanges /> Manage Requests
            </Link>
          )}
        </div>
      </motion.div>

      {/* ════════════ Admin / Volunteer View ════════════ */}
      {(role === "admin" || role === "volunteer") && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <StatCard
              icon={<FaUsers />}
              label="Total Users"
              value={totalUsers.toLocaleString()}
              sub="Registered members"
              iconBg="bg-[#05b4cd]/10"
              iconColor="text-[#05b4cd]"
              delay={0.1}
            />
            <StatCard
              icon={<VscGitPullRequestGoToChanges />}
              label="Total Requests"
              value={totalRequests.toLocaleString()}
              sub="All-time submissions"
              iconBg="bg-[#c6414c]/10"
              iconColor="text-[#c6414c]"
              delay={0.2}
            />
            <StatCard
              icon={<RiRefund2Fill />}
              label="Total Funding"
              value="$2,455"
              sub="All-time raised"
              iconBg="bg-green-50"
              iconColor="text-green-500"
              delay={0.3}
            />
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            <QuickLink
              to="/dashboard/all-requests"
              icon={<VscGitPullRequestGoToChanges />}
              title="Manage Requests"
              desc="View & update all donation requests"
              iconBg="bg-[#c6414c]/10"
              iconColor="text-[#c6414c]"
              delay={0.35}
            />
            {role === "admin" && (
              <QuickLink
                to="/dashboard/all-users"
                icon={<FiUsers />}
                title="Manage Users"
                desc="Control roles and user status"
                iconBg="bg-[#05b4cd]/10"
                iconColor="text-[#05b4cd]"
                delay={0.42}
              />
            )}
            <QuickLink
              to="/donation-requests"
              icon={<FiGlobe />}
              title="Public Requests"
              desc="Browse all pending requests"
              iconBg="bg-green-50"
              iconColor="text-green-500"
              delay={0.49}
            />
          </div>

          {/* Recent activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FiActivity className="text-[#05b4cd]" /> Recent Activity
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Latest 5 donation requests in the system</p>
              </div>
              <Link
                to="/dashboard/all-requests"
                className="btn btn-sm bg-[#05b4cd] hover:bg-white hover:text-[#05b4cd] hover:border-[#05b4cd] text-white border-transparent rounded-xl gap-1.5 transition-all duration-300"
              >
                View All <FiArrowRight />
              </Link>
            </div>

            {allRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <BiSolidDonateBlood className="text-4xl text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No requests found in the system yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {allRequests.map((req, index) => {
                  const dateObj = new Date(req.donationDate);
                  const formattedDate = dateObj.toLocaleDateString("en-GB");
                  const isLast = index === allRequests.length - 1;

                  return (
                    <motion.div
                      key={req._id}
                      className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${!isLast ? "border-b border-gray-100" : ""}`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.55 + index * 0.07 }}
                    >
                      {/* Left: blood group + name */}
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${bloodGroupColor(req.bloodGroup)}`}>
                          {req.bloodGroup}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{req.recipientName}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <FaLocationDot className="text-[#c6414c] shrink-0" />
                            <span className="truncate">{req.recipientDistrict}, {req.recipientUpazila}</span>
                          </p>
                        </div>
                      </div>

                      {/* Right: date + status */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-gray-400 hidden sm:block">{formattedDate}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusStyle[req.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                          {req.status}
                        </span>
                        <Link
                          to={`/dashboard/donation-request-details/${req._id}`}
                          state={{ from: "/dashboard" }}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#05b4cd] hover:text-white text-gray-500 flex items-center justify-center transition-all duration-200"
                        >
                          <FiEye className="text-sm" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* ════════════ Donor View ════════════ */}
      {role === "donor" && (
        <>
          {/* Donor quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Requests",
                value: recentRequests.length,
                icon: <BiSolidDonateBlood />,
                iconBg: "bg-[#c6414c]/10",
                iconColor: "text-[#c6414c]",
                delay: 0.1,
              },
              {
                label: "Pending",
                value: recentRequests.filter((r) => r.status === "pending").length,
                icon: <FiClock />,
                iconBg: "bg-amber-50",
                iconColor: "text-amber-500",
                delay: 0.15,
              },
              {
                label: "In Progress",
                value: recentRequests.filter((r) => r.status === "inprogress").length,
                icon: <FiActivity />,
                iconBg: "bg-[#05b4cd]/10",
                iconColor: "text-[#05b4cd]",
                delay: 0.2,
              },
              {
                label: "Completed",
                value: recentRequests.filter((r) => r.status === "done").length,
                icon: <FiCheckCircle />,
                iconBg: "bg-green-50",
                iconColor: "text-green-500",
                delay: 0.25,
              },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: s.delay }}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${s.iconBg} ${s.iconColor}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Donor quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <QuickLink
              to="/dashboard/my-requests"
              icon={<VscGitPullRequestGoToChanges />}
              title="My Donation Requests"
              desc="View and manage all your requests"
              iconBg="bg-[#c6414c]/10"
              iconColor="text-[#c6414c]"
              delay={0.3}
            />
            <QuickLink
              to="/dashboard/create-request"
              icon={<BiSolidDonateBlood />}
              title="Create New Request"
              desc="Post a new blood donation request"
              iconBg="bg-[#05b4cd]/10"
              iconColor="text-[#05b4cd]"
              delay={0.37}
            />
          </div>

          {/* Recent request cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Recent Requests</h2>
                <p className="text-xs text-gray-400 mt-0.5">Your latest 3 donation requests</p>
              </div>
              <Link
                to="/dashboard/my-requests"
                className="btn btn-sm bg-[#05b4cd] hover:bg-white hover:text-[#05b4cd] hover:border-[#05b4cd] text-white border-transparent rounded-xl gap-1.5 transition-all duration-300"
              >
                View All <FiArrowRight />
              </Link>
            </div>

            {recentRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-14 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#c6414c]/10 flex items-center justify-center mx-auto mb-4">
                  <BiSolidDonateBlood className="text-[#c6414c] text-3xl" />
                </div>
                <h3 className="font-semibold text-gray-700 mb-1">No requests yet</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Create your first blood donation request to get started.
                </p>
                <Link
                  to="/dashboard/create-request"
                  className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent rounded-xl transition-all duration-300"
                >
                  Create Request
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recentRequests.map((req, index) => {
                  const dateObj = new Date(req.donationDate);
                  const formattedDate = dateObj.toLocaleDateString("en-GB");
                  const [h, m] = req.donationTime.split(":");
                  const t = new Date();
                  t.setHours(h, m);
                  const formattedTime = t.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <motion.div
                      key={req._id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.45 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      {/* Top accent bar — secondary color */}
                      <div className="h-1.5 bg-[#05b4cd] w-full shrink-0" />

                      <div className="p-5 flex flex-col flex-1">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <div className="min-w-0">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                              Recipient
                            </p>
                            <h4 className="font-semibold text-gray-800 truncate">
                              {req.recipientName}
                            </h4>
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${bloodGroupColor(req.bloodGroup)}`}>
                            {req.bloodGroup}
                          </span>
                        </div>

                        <hr className="border-gray-100 mb-4" />

                        {/* Info rows */}
                        <div className="flex flex-col gap-2 flex-1 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FaLocationDot className="text-[#c6414c] shrink-0" />
                            <span className="truncate">
                              {req.recipientDistrict}, {req.recipientUpazila}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FiCalendar className="text-[#05b4cd] shrink-0" />
                              {formattedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiClock className="text-[#05b4cd] shrink-0" />
                              {formattedTime}
                            </span>
                          </div>
                        </div>

                        {/* Footer: status + actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0 ${statusStyle[req.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                            {req.status}
                          </span>

                          <div className="flex gap-1.5">
                            {req.status === "inprogress" && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(req._id, "done")}
                                  title="Mark as done"
                                  className="btn btn-xs bg-green-50 text-green-600 border-green-200 hover:bg-green-500 hover:text-white border rounded-lg gap-1"
                                >
                                  <FiCheckCircle /> Done
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(req._id, "canceled")}
                                  title="Cancel"
                                  className="btn btn-xs bg-red-50 text-[#c6414c] border-red-200 hover:bg-[#c6414c] hover:text-white border rounded-lg gap-1"
                                >
                                  <FiXCircle /> Cancel
                                </button>
                              </>
                            )}
                            <Link
                              to={`donation-request-details/${req._id}`}
                              state={{ from: window.location.pathname }}
                              title="View"
                              className="w-7 h-7 rounded-lg bg-[#05b4cd]/10 hover:bg-[#05b4cd] text-[#05b4cd] hover:text-white flex items-center justify-center transition-all duration-200"
                            >
                              <FiEye className="text-xs" />
                            </Link>
                            <Link
                              to={`/dashboard/edit-donation-request/${req._id}`}
                              title="Edit"
                              className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-400 text-amber-500 hover:text-white flex items-center justify-center transition-all duration-200"
                            >
                              <FiEdit2 className="text-xs" />
                            </Link>
                            <button
                              onClick={() => handleDeleteRequest(req._id)}
                              title="Delete"
                              className="w-7 h-7 rounded-lg bg-red-50 hover:bg-[#c6414c] text-[#c6414c] hover:text-white flex items-center justify-center transition-all duration-200"
                            >
                              <FiTrash2 className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
