import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const { logIn, error } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    logIn(email, password)
      .then(() => navigate(location.state?.from || "/"))
      .catch(() => {});
  };

  const handleDemoLogin = () => {
    logIn("donor@gmail.com", "donorPass1")
      .then(() => navigate(location.state?.from || "/"))
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Left panel (illustration) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#c6414c] relative overflow-hidden flex-col items-center justify-center p-16">
        {/* Decorative circles */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/donate.png"
            alt="Donate Blood"
            className="h-72 mx-auto rounded-lg mb-10 drop-shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-3">Welcome Back!</h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm">
            Sign in to manage your donation requests, track your impact, and
            help save more lives across Bangladesh.
          </p>

          {/* Mini stats */}
          <div className="flex justify-center gap-8 mt-10">
            {[
              { value: "12,480+", label: "Donors" },
              { value: "24,900+", label: "Lives Saved" },
              { value: "64", label: "Districts" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#c6414c] flex items-center justify-center shrink-0">
              <BiSolidDonateBlood className="text-white text-lg" />
            </div>
            <img className="h-7" src="/lifedrop.png" alt="LifeDrop" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Sign in to LifeDrop
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Welcome back — let's continue saving lives.
          </p>

          {/* Demo login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-[#05b4cd]/40 bg-[#05b4cd]/5 hover:bg-[#05b4cd]/10 text-[#05b4cd] text-sm font-semibold transition-all duration-200 mb-6"
          >
            <BiSolidDonateBlood />
            Try demo account
          </button>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400 font-medium">
              or sign in with email
            </span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <FiMail className="text-[#c6414c]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered focus:border-[#c6414c] focus:outline-none w-full rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FiLock className="text-[#c6414c]" /> Password
                </label>
                <span className="text-xs text-[#05b4cd] hover:underline cursor-pointer font-medium">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered focus:border-[#c6414c] focus:outline-none w-full pr-11 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                  {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {error && (
                <p className="text-[#c6414c] text-xs font-medium bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent w-full rounded-xl gap-2 transition-all duration-300 mt-1"
            >
              Sign In <FiArrowRight />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#c6414c] font-bold hover:underline"
            >
              Join as a Donor
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
