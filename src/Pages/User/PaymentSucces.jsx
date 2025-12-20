
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const orderId = new URLSearchParams(location.search).get("orderId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const markPaid = async () => {
        try {
          await axiosSecure.patch(`/orders/mark-paid/${orderId}`);
          setLoading(false);
        } catch (err) {
          console.error("Failed to mark order as paid:", err);
          setLoading(false);
        }
      };
      markPaid();
    }
  }, [orderId, axiosSecure]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <p className="text-lg text-indigo-900">Updating your order...</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            ✅ Payment Successful!
          </h2>
          <p>Order ID: {orderId}</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/dashboard/my-orders")}
          >
            Go to My Orders
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
