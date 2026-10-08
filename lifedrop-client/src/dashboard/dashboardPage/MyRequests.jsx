import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiCalendar,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

/* ─── helpers ─── */
const statusConfig = {
  pending: {
    label: "Pending",
    cls: "bg-amber-50 text-amber-600 border-amber-200",
  },
  inprogress: {
    label: "In Progress",
    cls: "bg-[#05b4cd]/10 text-[#05b4cd] border-[#05b4cd]/30",
  },
  done: { label: "Done", cls: "bg-green-50 text-green-600 border-green-200" },
  canceled: {
    label: "Canceled",
    cls: "bg-red-50 text-[#c6414c] border-red-200",
  },
};

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

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
];

/* ─── summary badge counts ─── */
function SummaryBadge({ label, count, active, onClick, accentCls, dotCls }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
        active
          ? `${accentCls} shadow-sm`
          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
      }`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotCls}`} />
      {label}
      <span
        className={`ml-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/30" : "bg-gray-100 text-gray-500"}`}
      >
        {count}
      </span>
    </button>
  );
}

/* ═══════════════════════════════ Page ═════════════════════════════════ */
const MyRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const itemPerPage = 10;

  const fetchMyRequests = async () => {
    setLoading(true);
    const statusQuery = statusFilter ? `&status=${statusFilter}` : "";
    const res = await axiosSecure.get(
      `/my-request?page=${currentPage - 1}&size=${itemPerPage}${statusQuery}`,
    );
    setMyRequests(res.data.request);
    setTotalRequests(res.data.totalRequest);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyRequests();
  }, [currentPage, statusFilter]);

  const numberOfPages = Math.ceil(totalRequests / itemPerPage);
  const pages = [...Array(numberOfPages).keys()].map((n) => n + 1);

  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/requests/status/${id}`, { status });
    if (res.data.modifiedCount > 0) fetchMyRequests();
  };

  const handleDeleteRequest = async (id) => {
    const res = await axiosSecure.delete(`/requests/${id}`);
    if (res.data.deletedCount > 0) fetchMyRequests();
  };

  const handleFilterChange = (val) => {
    setCurrentPage(1);
    setStatusFilter(val);
  };

  /* live counts from current data (approximate — full count needs API) */
  const countByStatus = (s) => myRequests.filter((r) => r.status === s).length;

  if (loading) return <Loader />;

  return (
    <div className="min-h-full bg-gray-50 p-4 md:p-8">
      {/* ── Page header banner ── */}
      <motion.div
        className="bg-secondary rounded-2xl p-7 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#c6414c]/40 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <BiSolidDonateBlood className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-0.5">
                Dashboard
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                My Donation Requests
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-semibold text-white/80 bg-white/15 px-3 py-1.5 rounded-xl">
              {totalRequests} total
            </span>
            <Link
              to="/dashboard/create-request"
              className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent rounded-xl gap-1.5 transition-all duration-300"
            >
              <FiPlus /> New Request
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Filter tabs ── */}
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {[
          {
            value: "",
            label: "All",
            dotCls: "bg-gray-400",
            accentCls: "bg-gray-800 text-white border-gray-800",
          },
          {
            value: "pending",
            label: "Pending",
            dotCls: "bg-amber-400",
            accentCls: "bg-amber-500 text-white border-amber-500",
          },
          {
            value: "inprogress",
            label: "In Progress",
            dotCls: "bg-[#05b4cd]",
            accentCls: "bg-[#05b4cd] text-white border-[#05b4cd]",
          },
          {
            value: "done",
            label: "Done",
            dotCls: "bg-green-500",
            accentCls: "bg-green-500 text-white border-green-500",
          },
          {
            value: "canceled",
            label: "Canceled",
            dotCls: "bg-[#c6414c]",
            accentCls: "bg-[#c6414c] text-white border-[#c6414c]",
          },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilterChange(f.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
              statusFilter === f.value
                ? `${f.accentCls} shadow-sm`
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${f.dotCls}`} />
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* ── Empty state ── */}
      {myRequests.length === 0 && (
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#c6414c]/10 flex items-center justify-center mx-auto mb-4">
            <BiSolidDonateBlood className="text-[#c6414c] text-3xl" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-1 text-lg">
            No requests found
          </h3>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            {statusFilter
              ? `No "${statusFilter}" requests yet. Try a different filter.`
              : "You haven't created any donation requests yet."}
          </p>
          <Link
            to="/dashboard/create-request"
            className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent rounded-xl gap-2 transition-all duration-300"
          >
            <FiPlus /> Create Request
          </Link>
        </motion.div>
      )}

      {/* ── Request cards grid ── */}
      {myRequests.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
            <AnimatePresence>
              {myRequests.map((req, index) => {
                const date = new Date(req.donationDate).toLocaleDateString(
                  "en-GB",
                );
                const [h, m] = req.donationTime.split(":");
                const t = new Date();
                t.setHours(h, m);
                const time = t.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                const sc = statusConfig[req.status] || {
                  label: req.status,
                  cls: "bg-gray-100 text-gray-600 border-gray-200",
                };

                return (
                  <motion.div
                    key={req._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    {/* Top accent  */}
                    <div className="h-1.5 w-full shrink-0 bg-primary" />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                            Recipient
                          </p>
                          <h4 className="font-bold text-gray-800 text-sm truncate">
                            {req.recipientName}
                          </h4>
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${bloodGroupColor(req.bloodGroup)}`}
                        >
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
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="text-[#05b4cd] shrink-0" />
                            {date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock className="text-[#05b4cd] shrink-0" />
                            {time}
                          </span>
                        </div>
                      </div>

                      {/* Footer: status + actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0 ${sc.cls}`}
                        >
                          {sc.label}
                        </span>

                        <div className="flex gap-1.5 items-center">
                          {req.status === "inprogress" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "done")
                                }
                                title="Mark as done"
                                className="btn btn-xs bg-green-50 text-green-600 border-green-200 hover:bg-green-500 hover:text-white border rounded-lg gap-1"
                              >
                                <FiCheckCircle className="text-xs" /> Done
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "canceled")
                                }
                                title="Cancel"
                                className="btn btn-xs bg-red-50 text-[#c6414c] border-red-200 hover:bg-[#c6414c] hover:text-white border rounded-lg gap-1"
                              >
                                <FiXCircle className="text-xs" /> Cancel
                              </button>
                            </>
                          )}

                          <Link
                            to={`/dashboard/donation-request-details/${req._id}`}
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
            </AnimatePresence>
          </div>

          {/* ── Pagination ── */}
          {numberOfPages > 1 && (
            <motion.div
              className="flex items-center justify-center gap-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#c6414c] hover:text-[#c6414c] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FiChevronLeft />
              </button>

              {/* Page numbers */}
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-9 h-9 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    currentPage === p
                      ? "bg-[#c6414c] text-white border-[#c6414c] shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:border-[#c6414c]/40 hover:text-[#c6414c]"
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={currentPage === numberOfPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#c6414c] hover:text-[#c6414c] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FiChevronRight />
              </button>

              {/* Page info */}
              <span className="text-xs text-gray-400 ml-2">
                Page {currentPage} of {numberOfPages}
              </span>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MyRequests;
