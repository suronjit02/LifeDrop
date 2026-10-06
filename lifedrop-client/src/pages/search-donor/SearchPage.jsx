import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMapPin, FiUser, FiDroplet } from "react-icons/fi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [divisions, setDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allUpazilas, setAllUpazilas] = useState([]);

  useEffect(() => {
    axios.get("/division.json").then((res) => setDivisions(res.data));
    axios.get("/district.json").then((res) => setAllDistricts(res.data));
    axios.get("/upazila.json").then((res) => setAllUpazilas(res.data));
  }, []);

  const filteredDistricts = division
    ? allDistricts.filter((d) => d.division_id === division)
    : [];

  const filteredUpazilas = district
    ? allUpazilas.filter((u) => u.district_id === district)
    : [];

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setDistrict("");
    setUpazila("");
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila("");
  };

  const handleSearch = async () => {
    setLoading(true);
    setDonors([]);
    setSearched(true);

    try {
      const params = {};
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (district)
        params.district = allDistricts.find((d) => d.id === district)?.name;
      if (upazila)
        params.upazila = allUpazilas.find((u) => u.id === upazila)?.name;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/search`,
        { params },
      );
      setDonors(
        Array.isArray(res.data)
          ? res.data
          : res.data.donors || res.data.data || [],
      );
    } catch (err) {
      console.log(err);
      setDonors([]);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="primary py-14 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BiSolidDonateBlood className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Find a Blood Donor
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
            Search verified donors by blood group and location. Every second
            counts — find the right match now.
          </p>
        </motion.div>
      </div>

      {/* Search Filter Card */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <FiSearch className="text-[#c6414c]" />
            Filter Donors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Blood Group */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <FiDroplet className="text-[#c6414c]" /> Blood Group
              </label>
              <select
                className="select select-bordered focus:border-[#c6414c] focus:outline-none w-full"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">All Groups</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <FaLocationDot className="text-[#c6414c]" /> Division
              </label>
              <select
                className="select select-bordered focus:border-[#c6414c] focus:outline-none w-full"
                value={division}
                onChange={handleDivisionChange}
              >
                <option value="">All Divisions</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <FiMapPin className="text-[#c6414c]" /> District
              </label>
              <select
                className="select select-bordered focus:border-[#c6414c] focus:outline-none w-full"
                value={district}
                onChange={handleDistrictChange}
                disabled={!division}
              >
                <option value="">
                  {division ? "Select District" : "Select Division First"}
                </option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <FiMapPin className="text-[#c6414c]" /> Upazila
              </label>
              <select
                className="select select-bordered focus:border-[#c6414c] focus:outline-none w-full"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!district}
              >
                <option value="">
                  {district ? "Select Upazila" : "Select District First"}
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="btn bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white w-full md:w-auto px-10 transition-all duration-300"
          >
            <FiSearch className="text-lg" />
            Search Donors
          </button>
        </motion.div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-[#c6414c]"></span>
            <p className="text-gray-500 text-sm">Searching for donors...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && searched && donors.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <BiSolidDonateBlood className="text-6xl text-gray-200 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-1">
              No donors found
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              Try adjusting your filters or searching a different location.
            </p>
          </motion.div>
        )}

        {/* Prompt before search */}
        {!loading && !searched && (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiSearch className="text-5xl text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm">
              Use the filters above to find available donors near you.
            </p>
          </motion.div>
        )}

        {/* Donor Cards */}
        {!loading && donors.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                <span className="text-[#c6414c] font-bold">{donors.length}</span>{" "}
                {donors.length === 1 ? "donor" : "donors"} found
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {donors.map((donor, index) => (
                  <motion.div
                    key={donor._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Card Top Bar */}
                    <div className="primary h-1.5 w-full" />

                    <div className="p-5">
                      {/* Avatar + Name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-50 border-2 border-[#c6414c]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {donor.mainPhotoUrl ? (
                            <img
                              src={donor.mainPhotoUrl}
                              alt={donor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiUser className="text-xl text-[#c6414c]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">
                            {donor.name}
                          </h4>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <FaLocationDot className="text-[#c6414c] flex-shrink-0" />
                            <span className="truncate">
                              {donor.district}
                              {donor.upazila ? `, ${donor.upazila}` : ""}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <hr className="border-gray-100 mb-4" />

                      {/* Blood Group Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          Blood Group
                        </span>
                        <span
                          className={`text-sm font-bold px-3 py-1 rounded-full border ${bloodGroupColor(donor.blood)}`}
                        >
                          {donor.blood}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
