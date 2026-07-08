import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const PRESETS = [100, 250, 500, 1000, 2000, 5000];

function getImpact(val) {
  if (val >= 5000)
    return "a major contribution helping us reach 20+ donors across Bangladesh.";
  if (val >= 2000) return "helps connect 8–10 donors with patients in need.";
  if (val >= 1000) return "helps connect 4–5 donors with patients in need.";
  if (val >= 500)
    return "covers operational costs to connect 2–3 donors with patients in need.";
  if (val >= 100) return "helps keep our platform running for 1 day.";
  return "Every taka counts — thank you.";
}

const Donate = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);

  const handlePreset = (val) => setAmount(val);

  const handleInput = (e) => {
    const val = e.target.value;
    setAmount(val === "" ? "" : Number(val));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!amount || amount < 1) return toast.info("Enter a valid amount!");
    const formData = {
      donateAmount: amount,
      donorEmail: user?.email,
      donorName: user?.displayName,
    };
    try {
      setLoading(true);
      const res = await axiosSecure.post("/create-payment-checkout", formData);
      const { url } = res.data;
      if (url) window.location.href = url;
    } catch (err) {
      console.log(err);
      toast.error("Payment failed, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img className="h-10 " src="/lifedrop.png" alt="LifeDrop" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Support LifeDrop
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your contribution helps connect blood donors
            <br />
            with those who need it most.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {/* Preset amounts */}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            Select an amount
          </p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {PRESETS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handlePreset(val)}
                className={`py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                  amount === val
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:text-red-500"
                }`}
              >
                ৳{val.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom input */}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            Or enter a custom amount
          </p>
          <div className="relative mb-5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
              ৳
            </span>
            <input
              type="number"
              value={amount}
              onChange={handleInput}
              min={1}
              placeholder="0"
              className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-lg text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
            />
          </div>

          {/* Impact card */}
          {amount > 0 && (
            <div className="flex gap-3 items-start bg-red-50 border border-red-100 rounded-xl p-4 mb-5">
              <svg
                className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-sm text-red-700 leading-relaxed">
                <span className="font-semibold">
                  ৳{Number(amount).toLocaleString()}
                </span>{" "}
                {getImpact(amount)}
              </p>
            </div>
          )}

          {/* Donor info */}
          {user && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold text-sm flex-shrink-0">
                {user.displayName?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          {/* Submit */}
          <form onSubmit={handleCheckout}>
            <button
              type="submit"
              disabled={loading || !amount || amount < 1}
              className="w-full py-3.5 bg-[#c6414c] hover:bg-[#a83540] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                  </svg>
                  Donate ৳{Number(amount || 0).toLocaleString()}
                </>
              )}
            </button>
          </form>

          {/* Secure note */}
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure payment · LifeDrop
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
