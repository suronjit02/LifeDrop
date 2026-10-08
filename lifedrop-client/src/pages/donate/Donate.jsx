import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiLock, FiHeart, FiUsers, FiZap } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";

const PRESETS = [100, 250, 500, 1000, 2000, 5000];

function getImpact(val) {
  if (val >= 5000)
    return {
      text: "a major contribution helping us reach 20+ donors across Bangladesh.",
      icon: <FiZap />,
    };
  if (val >= 2000)
    return {
      text: "helps connect 8–10 donors with patients in need.",
      icon: <FiUsers />,
    };
  if (val >= 1000)
    return {
      text: "helps connect 4–5 donors with patients in need.",
      icon: <FiUsers />,
    };
  if (val >= 500)
    return {
      text: "covers operational costs to connect 2–3 donors with patients in need.",
      icon: <FiHeart />,
    };
  if (val >= 100)
    return {
      text: "helps keep our platform running for 1 day.",
      icon: <FiHeart />,
    };
  return { text: "Every taka counts — thank you.", icon: <FiHeart /> };
}

const WHY_ITEMS = [
  {
    icon: <FiHeart />,
    title: "Save Lives",
    desc: "Every taka directly supports blood donation logistics.",
  },
  {
    icon: <FiUsers />,
    title: "Reach More",
    desc: "Help us expand to every district in Bangladesh.",
  },
  {
    icon: <FiZap />,
    title: "Fast Impact",
    desc: "Funds are deployed within 24 hours of donation.",
  },
];

const Donate = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);

  const handlePreset = (val) => setAmount(val);
  const handleInput = (e) => {
    const val = e.target.value;
    setAmount(val === "" ? "" : Number(val));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!amount || amount < 1) return toast.info("Enter a valid amount!");
    const formData = {
      donateAmount: amount,
      donorEmail: user?.email,
      donorName: user?.displayName,
    };
    try {
      setLoading(true);
      const res = await axiosSecure.post("/create-payment-checkout", formData);
      const { url } = res.data;
      if (url) window.location.href = url;
    } catch (err) {
      console.log(err);
      toast.error("Payment failed, try again!");
    } finally {
      setLoading(false);
    }
  };

  const impact = amount > 0 ? getImpact(amount) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero banner ── */}
      <div className="bg-primary py-14 px-4 text-center relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-white" />
          <div className="absolute -bottom-8 -right-8 w-72 h-72 rounded-full bg-white" />
        </div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BiSolidDonateBlood className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Support LifeDrop
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-lg mx-auto">
            Your contribution helps connect blood donors with patients in need —
            making a real difference every single day.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: Why donate ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Why Donate?
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your money saves lives
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                LifeDrop is a free platform. Every contribution goes directly
                toward connecting donors with patients across Bangladesh.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {WHY_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-base shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact strip */}
            <div className="bg-[#05b4cd]/10 border border-[#05b4cd]/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#05b4cd] flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Need help donating?</p>
                <p className="text-sm font-semibold text-[#05b4cd]">
                  +880 1739 145813
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Donation form card ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
              {/* Card header */}
              <div className="bg-gray-50 border-b border-gray-100 px-7 py-5">
                <div className="flex items-center gap-3">
                  <img className="h-8" src="/lifedrop.png" alt="LifeDrop" />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      LifeDrop Foundation
                    </p>
                    <p className="text-xs text-gray-400">
                      Secure donation powered by Stripe
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-7 py-6">
                {/* Preset amounts */}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Select an amount
                </p>
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {PRESETS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePreset(val)}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                        amount === val
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      ৳{val.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom input */}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Or enter a custom amount
                </p>
                <div className="relative mb-5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleInput}
                    min={1}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                {/* Impact banner */}
                {impact && amount > 0 && (
                  <motion.div
                    className="flex gap-3 items-start bg-primary/5 border border-primary/15 rounded-2xl p-4 mb-5"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm">
                      {impact.icon}
                    </div>
                    <p className="text-sm text-primary leading-relaxed">
                      <span className="font-bold">
                        ৳{Number(amount).toLocaleString()}
                      </span>{" "}
                      {impact.text}
                    </p>
                  </motion.div>
                )}

                {/* Donor info */}
                {user && (
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-[#05b4cd]/10 border border-[#05b4cd]/20 flex items-center justify-center text-[#05b4cd] font-bold text-sm shrink-0">
                      {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 shrink-0">
                      Verified
                    </span>
                  </div>
                )}

                {/* Submit */}
                <form onSubmit={handleCheckout}>
                  <button
                    type="submit"
                    disabled={loading || !amount || amount < 1}
                    className="w-full py-4 bg-primary hover:bg-[#a83540] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <BiSolidDonateBlood className="text-base" />
                        Donate ৳{Number(amount || 0).toLocaleString()}
                      </>
                    )}
                  </button>
                </form>

                {/* Security note */}
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                  <FiLock className="text-green-500" />
                  <span>256-bit SSL encrypted · Powered by Stripe</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
