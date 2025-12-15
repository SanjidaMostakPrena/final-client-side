import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const Order = () => {
  const { user } = useAuth(); // librarian info
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for books added by this librarian
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/librarian/orders/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch orders:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Cancel an order
  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (res.ok) {
        setOrders(prev =>
          prev.map(o => (o._id === orderId ? { ...o, status: "cancelled" } : o))
        );
        alert("Order cancelled successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  // Change order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders(prev =>
          prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        alert("Order status updated");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const statusOptions = ["pending", "shipped", "delivered"];

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Orders</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Book</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Order Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id} className="text-center border-t">
                <td className="px-4 py-2">{order.bookTitle}</td>
                <td className="px-4 py-2">{order.userName}</td>
                <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  {order.status !== "cancelled" ? (
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      className="select select-bordered"
                    >
                      {statusOptions
                        .filter(s => {
                          if (order.status === "pending") return s !== "pending" || s === "pending";
                          if (order.status === "shipped") return s !== "pending";
                          if (order.status === "delivered") return s === "delivered";
                          return true;
                        })
                        .map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                  ) : (
                    "cancelled"
                  )}
                </td>
                <td className="px-4 py-2">
                  {order.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
