
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const LibrarianOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://bookcourier.vercel.app/orders/librarian?email=${encodeURIComponent(user.email)}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user?.email]);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`https://bookcourier.vercel.app/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`https://bookcourier.vercel.app/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">Librarian Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found for your books.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Book Title</th>
              <th className="border p-2">User Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">{order.bookTitle}</td>
                <td className="border p-2">{order.userEmail}</td>
                <td className="border p-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border p-2">
                  {order.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibrarianOrders;
