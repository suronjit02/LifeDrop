import { useEffect, useState } from "react";
import axios from "axios";

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

  // districts of selected division
  const filteredDistricts = division
    ? allDistricts.filter((d) => d.division_id === division)
    : [];

  // upazilas of selected district
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
      console.log(res.data);
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#05b4cd]">
        Search Blood Donors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Blood Group */}
        <select
          className="select select-bordered"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Division */}
        <select
          className="select select-bordered"
          value={division}
          onChange={handleDivisionChange}
        >
          <option value="">Select Division</option>
          {divisions.map((div) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          className="select select-bordered"
          value={district}
          onChange={handleDistrictChange}
          disabled={!division}
        >
          <option value="">Select District</option>
          {filteredDistricts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          className="select select-bordered"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          disabled={!district}
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} className="btn bg-[#05b4cd] text-white">
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && searched && donors.length === 0 && (
        <p className="text-center text-gray-500">No donors found</p>
      )}

      {!loading && donors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-[#05b4cd] text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Blood</th>
                <th>District</th>
                <th>Upazila</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor._id}>
                  <td>{index + 1}</td>
                  <td>{donor.name}</td>
                  <td>{donor.blood}</td>
                  <td>{donor.district}</td>
                  <td>{donor.upazila}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
