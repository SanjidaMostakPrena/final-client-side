import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBook, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, axiosSecure]);

  const handlePaymentSuccess = async () => {
    if (!order) return;

    setProcessing(true);
    try {
      const res = await axiosSecure.patch(`/orders/${id}`, {
        status: "paid",
        paymentStatus: "paid",
      });

      if (res.status === 200) {
        alert("Payment successful!");
        navigate("/dashboard/my-orders");
      } else {
        alert("Payment failed. Try again.");
        console.error(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!order)
    return (
      <p className="text-center text-red-500 mt-10">Order not found.</p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Order Payment
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FaBook className="text-indigo-500" />
            <p>
              <strong>Book:</strong> {order.bookTitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-500" />
            <p>
              <strong>Amount:</strong> {order.amount || "N/A"} BDT
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-blue-500" />
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`ml-2 badge ${
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
          </div>
        </div>

        <div className="mt-8">
          {order.status === "pending" ? (
            <button
              className={`btn w-full btn-primary text-lg ${
                processing ? "loading" : ""
              }`}
              onClick={handlePaymentSuccess}
              disabled={processing}
            >
              {processing ? "Processing Payment..." : "Pay Now"}
            </button>
          ) : (
            <div className="text-center text-green-600 font-semibold text-lg">
              ✅ Payment already completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
