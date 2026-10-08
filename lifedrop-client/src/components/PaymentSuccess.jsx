import { useSearchParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiRefreshCw,
} from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/verify-payment?session_id=${sessionId}`,
    )
      .then((res) => res.json())
      .then((data) => setStatus(data.success ? "success" : "failed"));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* ── Loading ── */}
      {status === "loading" && (
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#05b4cd]/10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#05b4cd]" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-700 text-lg">
              Verifying your payment…
            </p>
            <p className="text-sm text-gray-400 mt-1">
              This will only take a moment.
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Success ── */}
      {status === "success" && (
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            {/* Green top bar */}
            <div className="h-2 bg-green-500 w-full" />

            <div className="px-8 py-10 text-center">
              {/* Icon */}
              <motion.div
                className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: 0.2,
                }}
              >
                <FiCheckCircle className="text-4xl text-green-500" />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Donation Successful!
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Thank you for your generous contribution to LifeDrop. Your
                support helps connect donors with patients who need it most. ❤️
              </p>

              {/* Impact strip */}
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BiSolidDonateBlood className="text-primary text-lg" />
                </div>
                <p className="text-sm text-primary text-left leading-relaxed">
                  Your donation is making a real difference in someone's life
                  today.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="btn bg-primary hover:bg-white hover:text-primary hover:border-primary text-white border-transparent w-full rounded-xl gap-2 transition-all duration-300"
                >
                  Go to Home <FiArrowRight />
                </Link>
                <Link
                  to="/donate"
                  className="btn bg-gray-50 hover:bg-[#05b4cd] hover:text-white hover:border-[#05b4cd] text-gray-600 border border-gray-200 w-full rounded-xl gap-2 transition-all duration-300"
                >
                  <BiSolidDonateBlood /> Donate Again
                </Link>
              </div>
            </div>

            {/* Footer strip */}
            <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 flex items-center justify-center gap-2">
              <img className="h-6" src="/lifedrop.png" alt="LifeDrop" />
              <span className="text-xs text-gray-400">
                LifeDrop · Saving lives together
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Failed ── */}
      {status === "failed" && (
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            {/* Red top bar */}
            <div className="h-2 bg-primary w-full" />

            <div className="px-8 py-10 text-center">
              {/* Icon */}
              <motion.div
                className="w-20 h-20 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: 0.2,
                }}
              >
                <FiXCircle className="text-4xl text-primary" />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Failed
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Something went wrong while processing your donation. No amount
                was charged. Please try again or contact our support team.
              </p>

              {/* Help strip */}
              <div className="bg-[#05b4cd]/5 border border-[#05b4cd]/20 rounded-2xl p-4 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#05b4cd] flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-white text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Need help? Call us</p>
                  <p className="text-sm font-semibold text-[#05b4cd]">
                    +880 1739 145813
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/donate"
                  className="btn bg-primary hover:bg-white hover:text-primary hover:border-primary text-white border-transparent w-full rounded-xl gap-2 transition-all duration-300"
                >
                  <FiRefreshCw /> Try Again
                </Link>
                <Link
                  to="/"
                  className="btn bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 w-full rounded-xl gap-2 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            {/* Footer strip */}
            <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 flex items-center justify-center gap-2">
              <img className="h-6" src="/lifedrop.png" alt="LifeDrop" />
              <span className="text-xs text-gray-400">
                LifeDrop · Saving lives together
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentSuccess;
