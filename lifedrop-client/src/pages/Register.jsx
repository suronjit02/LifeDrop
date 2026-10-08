import { Link, useNavigate, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiUser,
  FiMail,
  FiLock,
  FiMapPin,
  FiUpload,
  FiDroplet,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmPass] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get("/upazila.json")
      .then((res) => setUpazilas(res.data))
      .catch(console.error);
    axios
      .get("/district.json")
      .then((res) => setDistricts(res.data))
      .catch(console.error);
  }, []);

  const filteredUpazilas = district
    ? upazilas.filter((u) => u.district_id === district)
    : [];

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    const form = event.target;
    const name = form.name.value;
    const blood = form.blood.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const file = form.photoUrl.files[0];

    if (!file) {
      setError("Please select a profile photo.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters with uppercase and lowercase letters.",
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const imageFormData = new FormData();
      imageFormData.append("image", file);
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_Imgbb_ApiKey}`,
        imageFormData,
      );
      const mainPhotoUrl = imageResponse.data.data.display_url;

      const districtName = districts.find((d) => d.id === district)?.name;
      const upazilaName = filteredUpazilas.find((u) => u.id === upazila)?.name;

      const userData = {
        name,
        email,
        password,
        mainPhotoUrl,
        blood,
        district: districtName,
        upazila: upazilaName,
      };

      const firebaseResponse = await createUser(
        email,
        password,
        name,
        mainPhotoUrl,
      );
      console.log("Firebase user created:", firebaseResponse.user);

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code?.startsWith("auth/")) setError(err.code);
      else if (err.response?.data?.error) setError(err.response.data.error);
      else setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* shared label style */
  const labelClass =
    "text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5";
  const inputClass =
    "input input-bordered focus:border-[#c6414c] focus:outline-none w-full rounded-xl";
  const selectClass =
    "select select-bordered focus:border-[#c6414c] focus:outline-none w-full rounded-xl";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#c6414c] relative overflow-hidden flex-col items-center justify-center p-16 shrink-0">
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/donate.png"
            alt="Donate Blood"
            className="h-60 mx-auto rounded-lg mb-8 drop-shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-3">
            Join For Humanity
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Register as a blood donor and be part of a network saving thousands
            of lives across Bangladesh every year.
          </p>

          {/* Perks */}
          <div className="flex flex-col gap-3 mt-8 text-left">
            {[
              "Free to register & use",
              "Verified donor network",
              "Reach patients in any district",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <FiCheckCircle className="text-white/80 shrink-0" />
                <span className="text-white/80 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right: form ── */}
      <div className="flex-1 flex items-start justify-center px-6 py-10 overflow-y-auto">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-7">
            <div className="w-9 h-9 rounded-xl bg-[#c6414c] flex items-center justify-center shrink-0">
              <BiSolidDonateBlood className="text-white text-lg" />
            </div>
            <img className="h-7" src="/lifedrop.png" alt="LifeDrop" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Create your account
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-[#c6414c] font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            {/* Name + Photo row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className={labelClass}>
                  <FiUser className="text-[#c6414c]" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="e.g. Rafi Ahmed"
                  className={inputClass}
                />
              </div>

              {/* Photo */}
              <div>
                <label className={labelClass}>
                  <FiUpload className="text-[#c6414c]" /> Profile Photo
                </label>
                <div className="flex items-center gap-2">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="preview"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#c6414c]/30 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                      <FiUser className="text-gray-400" />
                    </div>
                  )}
                  <input
                    required
                    type="file"
                    name="photoUrl"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="file-input file-input-bordered file-input-sm w-full rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className={labelClass}>
                <FiDroplet className="text-[#c6414c]" /> Blood Group
              </label>
              <select
                required
                name="blood"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Choose Blood Group
                </option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-2 gap-4">
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
                    Choose District
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
                    {district ? "Choose Upazila" : "Select District First"}
                  </option>
                  {filteredUpazilas.map((u) => (
                    <option value={u.id} key={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>
                <FiMail className="text-[#c6414c]" /> Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <FiLock className="text-[#c6414c]" /> Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Min 6 chars"
                    className={`${inputClass} pr-11`}
                    onChange={() => setError("")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                  >
                    {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <FiLock className="text-[#05b4cd]" /> Confirm Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat password"
                    className={`${inputClass} pr-11`}
                    onChange={() => setError("")}
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                  >
                    {showConfirmPass ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password hint */}
            <p className="text-xs text-gray-400 -mt-2 flex items-center gap-1">
              <FiCheckCircle className="text-green-400" />
              At least 6 characters with uppercase &amp; lowercase letters.
            </p>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <p className="text-[#c6414c] text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] disabled:opacity-60 text-white border-transparent w-full rounded-xl gap-2 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            By joining, you agree to our{" "}
            <Link
              to="/terms-&-condition"
              className="text-[#05b4cd] hover:underline"
            >
              Terms &amp; Conditions
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
