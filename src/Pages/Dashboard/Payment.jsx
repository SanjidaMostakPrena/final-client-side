import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Payment = () => {
  const { id } = useParams(); // Order ID
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Fetch the order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:3000/orders/${id}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Handle payment
  const handlePaymentSuccess = async () => {
    if (!order) return;

    setProcessing(true);
    try {
      const res = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Payment successful!");
        navigate("/dashboard/my-orders"); // Redirect to My Orders page
      } else {
        alert("Payment failed. Try again.");
        console.error(result);
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p>Loading order...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Pay for Order #{id}</h2>

      <p className="mb-2">
        <strong>Book:</strong> {order.bookTitle}
      </p>
      <p className="mb-2">
        <strong>Amount:</strong> {order.amount} BDT
      </p>
      <p className="mb-4">
        <strong>Status:</strong>{" "}
        <span
          className={`badge ${
            order.status === "pending"
              ? "badge-warning"
              : order.status === "paid"
              ? "badge-success"
              : "badge-error"
          }`}
        >
          {order.status}
        </span>
      </p>

      {order.status === "pending" ? (
        <button
          className={`btn btn-primary ${processing ? "loading" : ""}`}
          onClick={handlePaymentSuccess}
          disabled={processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      ) : (
        <p className="text-green-600 font-semibold">
          Payment already completed.
        </p>
      )}
    </div>
  );
};

export default Payment;
