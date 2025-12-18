
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/user/orders/${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
  });

  const handleCancel = async (orderId) => {
    try {
      const res = await axiosSecure.patch(`/orders/${orderId}`, {
        status: "cancelled",
      });

      if (res.data?.message) {
        alert("Order cancelled successfully");
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-lg text-indigo-900">
        Loading your orders...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50 rounded-2xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-900">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-indigo-100 rounded-xl shadow-md bg-white">
            <thead className="bg-gradient-to-r from-teal-200 to-indigo-200 text-indigo-900">
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-indigo-50 transition-colors duration-300"
                >
                  <td>{index + 1}</td>
                  <td>{order.bookTitle || "Unknown Book"}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span
                      className={`badge px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-300 text-yellow-900"
                          : order.status === "paid"
                          ? "bg-green-300 text-green-900"
                          : order.status === "cancelled"
                          ? "bg-red-300 text-red-900"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="flex flex-col sm:flex-row gap-3">
                    {order.status === "pending" ? (
                      <>
                        <button
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </button>

                        {/* Pay Now Button goes to Payment Page */}
                        <Link
                          to={`/dashboard/payment/${order._id}`}
                          className="btn btn-sm bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-indigo-500 hover:to-teal-400 text-white font-semibold rounded-lg transition-all duration-300"
                        >
                          Pay Now
                        </Link>
                      </>
                    ) : (
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
