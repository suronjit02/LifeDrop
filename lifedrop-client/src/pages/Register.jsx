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

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  // console.log(district);
  // console.log(upazila);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const blood = event.target.blood.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const photoUrl = event.target.photoUrl;
    const file = photoUrl.files[0];

    // console.log(blood);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include both uppercase and lowercase letters"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Password did not match");
      return;
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=96c9ca8c8f54ca0770ab6f539a3b5d5a`,
      { image: file },

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      name,
      email,
      password,
      mainPhotoUrl,
      blood,
      district,
      upazila,
    };

    console.log(formData);

    if (res.data.success == true) {
      createUser(email, password, name, mainPhotoUrl)
        .then(() => {
          axios
            .post("http://localhost:5000/users", formData)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });

          navigate(location.state?.from || "/");
        })
        .catch((error) => {
          setError(error.code);
        });
    }
  };

  return (
    <div className="w-full min-h-screen py-10 flex gap-10 items-center justify-center px-4">
      <aside className="hidden md:block">
        <img className="h-100" src="/donate.png" alt="" />
      </aside>
      <form onSubmit={handleSignUp} className="w-full sm:max-w-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-2xl font-semibold text-center text-[#05b4cd] mb-2 border p-1 ">
          Join For Humanity
        </h2>

        <figure className="flex justify-center">
          <img className="h-8 mb-5" src="/lifedrop.jpeg" alt="" />
        </figure>

        <div className="flex flex-col gap-4">
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

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Choose Photo</label>
            <input
              type="file"
              name="photoUrl"
              className="file-input file-input-bordered w-full cursor-pointer focus:outline-none focus:ring-0 active:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold">Blood Group</label>
            <select
              required
              name="blood"
              defaultValue="Chose Blood Group"
              className="select w-full font-semibold"
            >
              <option disabled>Chose Blood Group</option>
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

          <div className="flex gap-4">
            <div>
              <label className="font-semibold">District</label>
              <select
                onChange={(e) => setDistrict(e.target.value)}
                required
                name="district"
                defaultValue="Chose Your District"
                className="select w-full"
              >
                <option disabled={true}>Chose Your District</option>

                {districts.map((district) => (
                  <option value={district.name} key={district.id}>
                    {district?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold">Upazila</label>
              <select
                onChange={(e) => setUpazila(e.target.value)}
                required
                name="upazila"
                defaultValue="Chose Your Upazila"
                className="select w-full"
              >
                <option disabled={true}>Chose Your Upazila</option>

                {upazilas.map((upazila) => (
                  <option value={upazila.name} key={upazila.id}>
                    {upazila?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

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

          {/* password field */}
          <div className="flex gap-4">
            <div className="flex flex-col">
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

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  name="confirmPassword"
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
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button className="btn border-none mt-6 w-full bg-[#05b4cd] hover:bg-sky-700 text-white transition">
          Sign Up
        </button>

        <p className="mt-6 sm:mt-10 text-center text-sm">
          Already have a membership?{" "}
          <Link
            to={"/login"}
            className="hover:underline text-sky-900 font-bold"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
