import { useEffect, useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  //   console.log(upazilas);

  const handleSearch = async () => {
    setLoading(true);
    setDonors([]);

    try {
      const params = {};
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (district) params.district = district;
      if (upazila) params.upazila = upazila;

      const res = await axios.get(
        "https://lifedrop-backend.vercel.app//public/search",
        {
          params,
        }
      );

      setDonors(res.data);
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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

        <select
          className="select select-bordered"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setUpazila("");
          }}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((upazila) => (
            <option key={upazila.id} value={upazila.name}>
              {upazila.name}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} className="btn bg-[#05b4cd] text-white">
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && donors.length === 0 && (
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
