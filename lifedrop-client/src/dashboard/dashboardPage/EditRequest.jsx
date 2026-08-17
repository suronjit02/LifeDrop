import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));

    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  const selectedDistrict = districts.find(
    (d) => d.name === formData.recipientDistrict,
  );

  const filteredUpazilas = selectedDistrict
    ? upazilas.filter((u) => u.district_id === selectedDistrict.id)
    : [];

  useEffect(() => {
    axiosSecure
      .get(`/requests/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        recipientName: formData.recipientName,
        recipientDistrict: formData.recipientDistrict,
        recipientUpazila: formData.recipientUpazila,
        hospitalName: formData.hospitalName,
        fullAddress: formData.fullAddress,
        bloodGroup: formData.bloodGroup,
        donationDate: formData.donationDate,
        donationTime: formData.donationTime,
        requestMessage: formData.requestMessage,
      };

      const res = await axiosSecure.patch(`/requests/${id}`, updateData);

      if (res.data.modifiedCount > 0) {
        toast.success("Donation request updated successfully!");
        navigate("/dashboard/my-requests");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 border border-[#05b4cd] rounded-md shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-lg md:text-2xl font-bold">Edit Donation Request</h2>

        <img className="h-10" src="/lifedrop.png" alt="LifeDrop" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Recipient Name */}
        <div>
          <label className="label">Recipient Name</label>

          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            placeholder="Recipient Name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Hospital Name */}
        <div>
          <label className="label">Hospital Name</label>

          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            placeholder="Hospital Name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="font-semibold">District</label>

          <select
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                recipientDistrict: e.target.value,
                recipientUpazila: "",
              }));
            }}
            value={formData.recipientDistrict}
            name="recipientDistrict"
            className="select w-full"
            required
          >
            <option value="">Choose Your District</option>

            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="font-semibold">Upazila</label>

          <select
            onChange={handleChange}
            value={formData.recipientUpazila}
            name="recipientUpazila"
            className="select w-full"
            required
            disabled={!formData.recipientDistrict}
          >
            <option value="">Choose Your Upazila</option>

            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Full Address */}
        <div>
          <label className="label">Full Address</label>

          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            placeholder="Full Address"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select</option>

            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Donation Date */}
        <div>
          <label className="label">Donation Date</label>

          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="label">Donation Time</label>

          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="label">Request Message</label>

          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            placeholder="Request Message"
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="btn bg-[#05b4cd] hover:bg-[#049caf] border-none text-white"
          >
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRequest;
