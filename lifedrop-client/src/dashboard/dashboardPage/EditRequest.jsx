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
      .then((data) => setUpazilas(data.upazilas));

    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts));
  }, []);

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
    <div className="p-4 md:p-6 border border-[#05b4cd] rounded-md">
      <h2 className="text-xl md:text-2xl text-[#05b4cd] font-bold mb-4">
        Edit Donation Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="input input-bordered w-full"
          required
        />
        <div className="flex gap-2">
          <select
            onChange={handleChange}
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

          <select
            onChange={handleChange}
            value={formData.recipientUpazila}
            name="recipientUpazila"
            className="select w-full"
            required
          >
            <option value="">Choose Your Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="input input-bordered w-full"
          required
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <textarea
          name="requestMessage"
          value={formData.requestMessage}
          onChange={handleChange}
          placeholder="Request Message"
          className="textarea textarea-bordered w-full"
          required
        />
        <button type="submit" className="btn bg-[#05b4cd] text-white w-full">
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
