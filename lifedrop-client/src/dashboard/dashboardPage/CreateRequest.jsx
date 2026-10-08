import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiDroplet,
  FiCalendar,
  FiClock,
  FiFileText,
  FiHome,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { FaHospitalAlt } from "react-icons/fa";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const labelClass =
  "text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5";
const inputClass =
  "input input-bordered focus:border-[#c6414c] focus:outline-none w-full rounded-xl bg-white";
const selectClass =
  "select select-bordered focus:border-[#c6414c] focus:outline-none w-full rounded-xl bg-white";

const CreateRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get("/upazila.json").then((res) => setUpazilas(res.data));
    axios.get("/district.json").then((res) => setDistricts(res.data));
  }, []);

  const filteredUpazilas = district
    ? upazilas.filter((u) => u.district_id === district)
    : [];

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      recipientDistrict: form.district.value,
      recipientUpazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      setSubmitting(true);
      const res = await axiosSecure.post("/requests", formData);
      if (res.data.insertedId) {
        toast.success("Donation request created successfully!");
        form.reset();
        setDistrict("");
        setUpazila("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create donation request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50 p-4 md:p-8">
      {/* ── Page header ── */}
      <motion.div
        className="bg-primary rounded-2xl p-7 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/80 pointer-events-none" />
        <div className="absolute bottom-0 right-24 w-20 h-20 rounded-full bg-white/50 pointer-events-none" />
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
                Create Donation Request
              </h1>
            </div>
          </div>
          <img
            className="h-9 hidden sm:block"
            src="/lifedrop.png"
            alt="LifeDrop"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ── Sidebar tips ── */}
        <motion.div
          className="lg:col-span-1 flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-4">
              Before You Submit
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Fill in all required fields accurately.",
                "Make sure the hospital name and address are correct.",
                "Double-check the donation date and time.",
                "Write a clear message to help donors understand the urgency.",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c6414c]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Requester info card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#05b4cd] mb-4">
              Requesting As
            </p>
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#c6414c]/20 shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#c6414c]/10 flex items-center justify-center shrink-0">
                  <FiUser className="text-[#c6414c]" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <FiCheckCircle className="text-green-500 text-sm shrink-0" />
              <span className="text-xs text-gray-400">
                Verified donor account
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Main form ── */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Form top accent */}
            <div className="h-1.5 bg-[#05b4cd] w-full" />

            <div className="p-6 md:p-8">
              {/* ── Section: Requester info (read-only) ── */}
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#05b4cd] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  Requester Info
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <FiUser className="text-[#c6414c]" /> Name
                    </label>
                    <input
                      type="text"
                      value={user?.displayName || ""}
                      readOnly
                      className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <FiMail className="text-[#c6414c]" /> Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-7" />

              {/* ── Section: Recipient info ── */}
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#c6414c] text-white flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Recipient Info
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <FiUser className="text-[#c6414c]" /> Recipient Name
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      placeholder="Patient's full name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <FiDroplet className="text-[#c6414c]" /> Blood Group
                    </label>
                    <select name="bloodGroup" required className={selectClass}>
                      <option value="">Select blood group</option>
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <FiMapPin className="text-[#c6414c]" /> District
                    </label>
                    <select
                      onChange={handleDistrictChange}
                      required
                      name="district"
                      value={district}
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select district
                      </option>
                      {districts.map((d) => (
                        <option value={d.id} key={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <FiMapPin className="text-[#05b4cd]" /> Upazila
                    </label>
                    <select
                      onChange={(e) => setUpazila(e.target.value)}
                      required
                      name="upazila"
                      value={upazila}
                      disabled={!district}
                      className={`${selectClass} disabled:opacity-50`}
                    >
                      <option value="" disabled>
                        {district ? "Select upazila" : "Select district first"}
                      </option>
                      {filteredUpazilas.map((u) => (
                        <option value={u.id} key={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-7" />

              {/* ── Section: Hospital & location ── */}
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#c6414c] text-white flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  Hospital &amp; Location
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <FaHospitalAlt className="text-[#c6414c]" /> Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      placeholder="e.g. Dhaka Medical College"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <FiHome className="text-[#c6414c]" /> Full Address
                    </label>
                    <input
                      type="text"
                      name="fullAddress"
                      placeholder="Ward / Road / Area"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-7" />

              {/* ── Section: Date, time & message ── */}
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#c6414c] text-white flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  Schedule &amp; Message
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>
                      <FiCalendar className="text-[#c6414c]" /> Donation Date
                    </label>
                    <input
                      type="date"
                      name="donationDate"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <FiClock className="text-[#c6414c]" /> Donation Time
                    </label>
                    <input
                      type="time"
                      name="donationTime"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    <FiFileText className="text-[#c6414c]" /> Request Message
                  </label>
                  <textarea
                    name="requestMessage"
                    required
                    rows={4}
                    placeholder="Describe the urgency and any important details for potential donors..."
                    className="textarea textarea-bordered focus:border-[#c6414c] focus:outline-none w-full rounded-xl bg-white resize-none"
                  />
                </div>
              </div>

              {/* ── Submit ── */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-100 mt-2">
                <p className="text-xs text-gray-400 hidden sm:block">
                  All fields marked are required.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-slide px-8 rounded-xl"
                >
                  {submitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <FiSend /> Submit Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateRequest;
