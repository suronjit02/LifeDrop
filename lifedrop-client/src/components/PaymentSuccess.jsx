import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/verify-payment?session_id=${sessionId}`,
    )
      .then((res) => res.json())
      .then((data) => setStatus(data.success ? "success" : "failed"));
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === "loading" && (
        <p className="text-xl font-semibold text-blue-500">
          Verifying payment...
        </p>
      )}

      {status === "success" && (
        <div className="text-center bg-green-100 p-10 py-15 rounded-md">
          <h1 className="text-3xl font-bold text-secondary">
            ✅ Donation Successful!
          </h1>
          <p className="mt-4 text-gray-700">Thank you for your support! ❤️</p>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center bg-red-100 p-10 py-15 rounded-md">
          <h1 className="text-3xl font-bold text-primary">
            ❌ Something went wrong
          </h1>
          <p className="mt-4 text-gray-700">
            Please try again or contact support.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
