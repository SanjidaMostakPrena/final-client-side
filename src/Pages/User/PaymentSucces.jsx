import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  useEffect(() => {
    const updatePayment = async () => {
      try {
        const orderRes = await axiosSecure.get(`/orders/${orderId}`);
        const order = orderRes.data;
        if (!order) return setSuccess(false);

        await axiosSecure.post("/payments", {
          orderId: order._id,
          email: order.userEmail,
          amount: order.amount,
          transactionId: "StripeCheckout",
        });

        await axiosSecure.patch(`/orders/${orderId}`, {
          status: "paid",
          paymentStatus: "paid",
        });

        setSuccess(true);
      } catch (err) {
        console.error(err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) updatePayment();
  }, [orderId, axiosSecure]);

  if (loading) return <div>Processing Payment...</div>;

  return (
    <div>
      {success ? (
        <>
          <h2>✅ Payment Successful!</h2>
          <button onClick={() => navigate("/dashboard/my-orders")}>
            Go to My Orders
          </button>
        </>
      ) : (
        <>
          <h2>❌ Payment Failed!</h2>
          <button onClick={() => navigate("/dashboard/my-orders")}>
            Back to Orders
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
