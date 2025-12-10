// src/Pages/UserDashboard/MyOrders.jsx
import React, { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/orders?email=${user.email}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  const handleCancel = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (res.ok) {
        alert("Order cancelled successfully");
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = (orderId) => {
    navigate(`/payment/${orderId}`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "text-orange-500";
      case "delivered": return "text-green-500";
      case "cancelled": return "text-red-500";
      case "refunded": return "text-purple-500";
      default: return "text-gray-500";
    }
  };

  const getPaymentColor = (payment) => {
    return payment.toLowerCase() === "paid" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Book Title</th>
              <th className="py-3 px-6 text-left">Order Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Payment</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{order.bookTitle}</td>
                <td className="py-3 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className={`py-3 px-6 font-semibold ${getStatusColor(order.status)}`}>{order.status}</td>
                <td className={`py-3 px-6 font-semibold ${getPaymentColor(order.paymentStatus)}`}>{order.paymentStatus}</td>
                <td className="py-3 px-6 flex gap-2">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                      {order.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePay(order._id)}
                          className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Pay Now
                        </button>
                      )}
                    </>
                  )}
                  {(order.status !== "pending" || order.paymentStatus === "paid") && (
                    <span className="text-gray-400">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
