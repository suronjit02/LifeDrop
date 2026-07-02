import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

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
      .then(() => {
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        // Error is already handled in AuthProvider
      });
  };

  // Demo User Login
  const handleDemoLogin = () => {
    const demoEmail = "donor@gmail.com";
    const demoPassword = "donorPass1";

    logIn(demoEmail, demoPassword)
      .then(() => {
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        // Error is already handled in AuthProvider
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 gap-10">
      <aside className="hidden md:block">
        <img className="h-100" src="/donate.png" alt="" />
      </aside>

      <form
        onSubmit={handleLogin}
        className="w-full sm:max-w-md rounded-md p-6 sm:p-8"
      >
        <figure className="flex justify-center">
          <img className="h-10 mb-10" src="/lifedrop.png" alt="" />
        </figure>

        {/* Demo User Login  */}
        <Link
          to="#"
          onClick={handleDemoLogin}
          className="text-center flex justify-center border border-[#05b4cd] text-sm font-semibold p-1 rounded-sm hover:border-[#c6414c]"
        >
          Click for Login as demo User
        </Link>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#05b4cd] mt-4">
          Login to LifeDrop
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please sign in to continue
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered focus:outline-none w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password </label>
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
            {error && (
              <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
            )}
          </div>

          <p className="text-sm cursor-pointer text-right hover:underline">
            Forgot Password?
          </p>
        </div>

        <button className="btn border-none mt-6 w-full bg-[#05b4cd]  text-white transition">
          Log in
        </button>

        <p className="mt-6 sm:mt-10 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="hover:underline text-[#05b4cd] font-bold"
          >
            Join Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
