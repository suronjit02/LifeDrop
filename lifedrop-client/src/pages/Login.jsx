import React, { useState } from "react";
import { Link } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 gap-10">
      <form className="w-full sm:max-w-md rounded-md p-6 sm:p-8">
        <figure className="flex justify-center">
          <img className="h-10 mb-10" src="/lifedrop.jpeg" alt="" />
        </figure>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#05b4cd] mb-6">
          Log in
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered focus:outline-none w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                required
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password here"
                className="input input-bordered focus:outline-none w-full pr-10"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 z-50"
              >
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>

          <p className="text-sm cursor-pointer text-right hover:underline">
            Forgot Password?
          </p>
        </div>

        <button className="btn border-none mt-6 w-full bg-[#05b4cd] hover:bg-sky-700 text-white transition">
          Log in
        </button>
        <p className="my-1 text-center text-sm">or</p>

        <p className="mt-6 sm:mt-10 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="hover:underline text-sky-900 font-bold"
          >
            Join Now
          </Link>
        </p>
      </form>
      <aside className="hidden md:block">
        <img className="h-100" src="/donate.png" alt="" />
      </aside>
    </div>
  );
};

export default Login;
