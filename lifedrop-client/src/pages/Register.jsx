import { Link, useNavigate, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

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

  // Load district and upazila data
  useEffect(() => {
    axios
      .get("/upazila.json")
      .then((res) => {
        setUpazilas(res.data);
      })
      .catch((err) => {
        console.error("Upazila fetch error:", err);
      });

    axios
      .get("/district.json")
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((err) => {
        console.error("District fetch error:", err);
      });
  }, []);

  const filteredUpazilas = district
    ? upazilas.filter((u) => u.district_id === district)
    : [];

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila("");
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

    // =========================
    // Validation
    // =========================

    if (!file) {
      setError("Please select a profile photo.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Confirm password must match the password.");
      return;
    }

    try {
      // =========================
      // 1. Upload image to ImgBB
      // =========================

      const imageFormData = new FormData();

      imageFormData.append("image", file);

      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=96c9ca8c8f54ca0770ab6f539a3b5d5a`,
        imageFormData,
      );

      console.log("ImgBB response:", imageResponse.data);

      const mainPhotoUrl = imageResponse.data.data.display_url;

      // =========================
      // 2. Get district & upazila name
      // =========================

      const districtName = districts.find((d) => d.id === district)?.name;

      const upazilaName = filteredUpazilas.find((u) => u.id === upazila)?.name;

      // =========================
      // 3. Prepare MongoDB data
      // =========================

      const userData = {
        name,
        email,
        password,
        mainPhotoUrl,
        blood,
        district: districtName,
        upazila: upazilaName,
      };

      console.log("User data:", userData);

      // =========================
      // 4. Create Firebase user
      // =========================

      const firebaseResponse = await createUser(
        email,
        password,
        name,
        mainPhotoUrl,
      );

      console.log("Firebase user created:", firebaseResponse.user);

      // =========================
      // 5. Save user to MongoDB
      // =========================

      const mongoResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userData,
      );

      console.log("MongoDB response:", mongoResponse.data);

      // =========================
      // 6. Navigate
      // =========================

      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Registration error:", err);

      // Firebase error
      if (err.code?.startsWith("auth/")) {
        setError(err.code);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message || "Registration failed");
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-10 flex gap-10 items-center justify-center px-4">
      <aside className="hidden md:block">
        <img className="h-100" src="/donate.png" alt="" />
      </aside>

      <form onSubmit={handleSignUp} className="w-full sm:max-w-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-2xl font-semibold text-center text-[#05b4cd] mb-2 border p-1">
          Join For Humanity
        </h2>

        <figure className="flex justify-center">
          <img className="h-8 mb-5" src="/lifedrop.png" alt="" />
        </figure>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Name</label>

            <input
              required
              type="text"
              name="name"
              placeholder="Write your name here"
              className="input input-bordered focus:outline-none w-full"
            />
          </div>

          {/* Photo */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Choose Photo</label>

            <input
              required
              type="file"
              name="photoUrl"
              accept="image/*"
              className="file-input file-input-bordered w-full cursor-pointer focus:outline-none focus:ring-0 active:outline-none"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-semibold">Blood Group</label>

            <select
              required
              name="blood"
              defaultValue=""
              className="select w-full font-semibold"
            >
              <option value="" disabled>
                Choose Blood Group
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* District & Upazila */}
          <div className="flex gap-4">
            {/* District */}
            <div className="w-1/2">
              <label className="font-semibold">District</label>

              <select
                onChange={handleDistrictChange}
                required
                name="district"
                value={district}
                className="select w-full"
              >
                <option value="" disabled>
                  Choose Your District
                </option>

                {districts.map((d) => (
                  <option value={d.id} key={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="w-1/2">
              <label className="font-semibold">Upazila</label>

              <select
                onChange={(e) => setUpazila(e.target.value)}
                required
                name="upazila"
                value={upazila}
                disabled={!district}
                className="select w-full"
              >
                <option value="" disabled>
                  Choose Your Upazila
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
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>

            <input
              required
              type="email"
              name="email"
              placeholder="Email here"
              className="input input-bordered focus:outline-none w-full"
            />
          </div>

          {/* Password */}
          <div className="flex gap-4">
            {/* Password */}
            <div className="flex flex-col w-1/2">
              <label className="font-semibold mb-1">Password</label>

              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password here"
                  className="input input-bordered focus:outline-none w-full pr-10"
                  onChange={() => setError("")}
                />

                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 z-50"
                >
                  {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col w-1/2">
              <label className="font-semibold mb-1">Confirm Password</label>

              <div className="relative">
                <input
                  required
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Password here"
                  className="input input-bordered focus:outline-none w-full pr-10"
                  onChange={() => setError("")}
                />

                <span
                  onClick={() => setConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 z-50"
                >
                  {showConfirmPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        {/* Submit */}
        <button className="btn border-none mt-6 w-full bg-[#05b4cd] text-white transition">
          Sign Up
        </button>

        {/* Login */}
        <p className="mt-6 sm:mt-10 text-center text-sm">
          Already have a membership?{" "}
          <Link
            to="/login"
            className="hover:underline text-[#05b4cd] font-bold"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
