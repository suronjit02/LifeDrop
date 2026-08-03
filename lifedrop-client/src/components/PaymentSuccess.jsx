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
    <div>
      {status === "loading" && <p>Verifying payment...</p>}
      {status === "success" && <h1>✅ Donation Successful! ধন্যবাদ।</h1>}
      {status === "failed" && <h1>❌ Something went wrong</h1>}
    </div>
  );
};

export default PaymentSuccess;
