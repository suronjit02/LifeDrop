import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

const CreateRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

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

  console.log(upazila);
  console.log(district);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const requesterName = user?.displayName;
    const requesterEmail = user?.email;
    const recipientName = form.recipientName.value;
    const recipientDistrict = form.district.value;
    const recipientUpazila = form.upazila.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;
    const status = "pending";
    const createdAt = new Date();

    const formData = {
      requesterName,
      requesterEmail,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      status,
      createdAt,
    };

    try {
      const res = await axiosSecure.post("/requests", formData);

      if (res.data.insertedId) {
        toast.success("Donation request created successfully");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create donation request");
    }

    console.log(formData);
  };

  console.log(user);

  return (
    <div className="max-w-4xl mx-auto p-6 border border-[#05b4cd] rounded-md shadow-md">
      <div className=" flex flex-col md:flex-row items-center justify-between mb-6 ">
        <h2 className="text-lg md:text-2xl font-bold">
          Create Donation Request
        </h2>

        <img className="h-10 " src="/lifedrop.jpeg" alt="LifeDrop" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            placeholder="Recipient Name"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            required
            className="input input-bordered w-full"
          />
        </div>

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

        <div>
          <label className="label">Full Address</label>
          <input
            type="text"
            name="fullAddress"
            placeholder="Full Address"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            required
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            name="requestMessage"
            required
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="btn primary text-white">
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
