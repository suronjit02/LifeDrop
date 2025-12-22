import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const Donate = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    if (!donateAmount) return toast.info("Enter amount!");
    const formData = {
      donateAmount,
      donorEmail: user?.email,
      donorName: user?.displayName,
    };
    try {
      const res = await axiosSecure.post("/create-payment-checkout", formData);
      const { url } = res.data;
      if (url) window.location.href = url;
    } catch (err) {
      console.log(err);
      toast.error("Payment failed, try again!");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleCheckout}
        className="flex justify-center items-center min-h-screen gap-4"
      >
        <input
          name="donateAmount"
          type="number"
          placeholder="Enter donation amount"
          className="input"
        />
        <button className="btn bg-[#05b4cd] text-white" type="submit">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donate;
