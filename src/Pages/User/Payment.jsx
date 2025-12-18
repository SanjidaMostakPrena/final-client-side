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

  // bKash fields
  const [bkashNumber, setBkashNumber] = useState("");
  const [trxId, setTrxId] = useState("");

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
    if (!bkashNumber || !trxId)
      return alert("Please enter bKash number and transaction ID!");

    setProcessing(true);

    try {
      // Simulate bKash payment verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update order status after successful payment
      const res = await axiosSecure.patch(`/orders/${id}`, {
        status: "paid",
        paymentStatus: "paid",
      });

      if (res.status === 200) {
        alert("Payment successful via bKash!");
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

  // Determine the correct amount to display
  const displayAmount =
    order.amount !== undefined && order.amount !== null
      ? order.amount
      : order.totalAmount !== undefined && order.totalAmount !== null
      ? order.totalAmount
      : order.bookPrice !== undefined && order.bookPrice !== null
      ? order.bookPrice
      : "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Order Payment (bKash)
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FaBook className="text-indigo-500" />
            <p>
              <strong>Book:</strong> {order.bookTitle || "Unknown Book"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-500" />
            <p>
              <strong>Amount:</strong>{" "}
              {displayAmount !== "N/A"
                ? Number(displayAmount).toLocaleString()
                : "N/A"}{" "}
              BDT
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

        {/* bKash payment form */}
        {order.status === "pending" && (
          <div className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="bKash Number (11 digits)"
              maxLength={11}
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Transaction ID"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        )}

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
