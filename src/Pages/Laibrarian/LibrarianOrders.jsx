import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusOptions = ["pending", "shipped", "delivered"];

const LibrarianOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all orders for books added by this librarian
  const { data: orders = [], refetch, isLoading } = useQuery({
    queryKey: ["librarian-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders`, {
        params: { librarianEmail: user.email },
      });
      // Filter orders for books added by this librarian
      return res.data.filter(order => order.book?.addedBy === user.email);
    },
  });

  // Cancel an order
  const handleCancel = async (orderId) => {
    try {
      await axiosSecure.delete(`/orders/${orderId}`);
      toast.success("Order cancelled successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, status) => {
    try {
      await axiosSecure.patch(`/orders/${orderId}`, { status });
      toast.success("Order status updated!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    }
  };

  if (isLoading)
    return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Orders for Your Books</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-xl shadow-md bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Ordered By</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.userEmail}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LibrarianOrders;
