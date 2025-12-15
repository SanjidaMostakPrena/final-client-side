import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user's orders from backend
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/orders/${user.email}`);
      return res.data;
    },
  });

  // Handle order cancellation
  const handleCancel = async (orderId) => {
    try {
      // <-- FIXED PATCH URL -->
      const res = await axiosSecure.patch(`/orders/cancel/${orderId}`);
      if (res.data.modifiedCount > 0) {
        alert("Order cancelled successfully");
        refetch();
      } else {
        alert("Failed to cancel the order");
      }
    } catch (err) {
      console.error(err);
      alert("Error cancelling the order");
    }
  };

  if (isLoading) return <p>Loading your orders...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>#</th>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.bookTitle}</td>
                  <td>
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
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
                  </td>

                  <td className="flex gap-3">
                    {order.status === "pending" && (
                      <>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </button>
                        <Link
                          to={`/dashboard/payment/${order._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Pay Now
                        </Link>
                      </>
                    )}

                    {order.status !== "pending" && (
                      <span className="text-gray-500 italic">
                        No Actions Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
