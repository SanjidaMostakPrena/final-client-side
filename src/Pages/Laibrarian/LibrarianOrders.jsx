
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import useAuth from "../../Hooks/useAuth";

// // const LibrarianOrders = () => {
// //   const { user } = useAuth();
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get(
// //         `http://localhost:5000/orders/librarian?email=${encodeURIComponent(user.email)}`
// //       );
// //       setOrders(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (user?.email) fetchOrders();
// //   }, [user?.email]);

// //   const handleCancel = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/orders/${id}`);
// //       fetchOrders();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleStatusChange = async (id, status) => {
// //     try {
// //       await axios.patch(`http://localhost:5000/orders/${id}`, { status });
// //       fetchOrders();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (loading) return <p>Loading orders...</p>;

// //   return (
// //     <div className="p-5">
// //       <h2 className="text-3xl font-bold mb-5">Librarian Orders</h2>
// //       {orders.length === 0 ? (
// //         <p>No orders found for your books.</p>
// //       ) : (
// //         <table className="table-auto border-collapse border border-gray-300 w-full">
// //           <thead>
// //             <tr className="bg-gray-200">
// //               <th className="border p-2">Order ID</th>
// //               <th className="border p-2">Book Title</th>
// //               <th className="border p-2">User Email</th>
// //               <th className="border p-2">Status</th>
// //               <th className="border p-2">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {orders.map(order => (
// //               <tr key={order._id} className="hover:bg-gray-100">
// //                 <td className="border p-2">{order._id}</td>
// //                 <td className="border p-2">{order.bookTitle}</td>
// //                 <td className="border p-2">{order.userEmail}</td>
// //                 <td className="border p-2">
// //                   <select
// //                     value={order.status}
// //                     onChange={(e) => handleStatusChange(order._id, e.target.value)}
// //                     className="border rounded px-2 py-1"
// //                   >
// //                     <option value="pending">Pending</option>
// //                     <option value="shipped">Shipped</option>
// //                     <option value="delivered">Delivered</option>
// //                     <option value="cancelled">Cancelled</option>
// //                   </select>
// //                 </td>
// //                 <td className="border p-2">
// //                   {order.status !== "cancelled" && (
// //                     <button
// //                       onClick={() => handleCancel(order._id)}
// //                       className="bg-red-500 text-white px-3 py-1 rounded"
// //                     >
// //                       Cancel
// //                     </button>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default LibrarianOrders;
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";

// const LibrarianOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // Fetch all orders for librarian's books
//   const {
//     data: orders = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["librarian-orders", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       if (!user?.email) return [];
//       const res = await axiosSecure.get(
//         `/orders/librarian?email=${encodeURIComponent(user.email)}`
//       );
//       return res.data;
//     },
//   });

//   // Cancel order
//   const handleCancel = async (orderId) => {
//     try {
//       const res = await axiosSecure.delete(`/orders/${orderId}`);
//       if (res.data?.success) {
//         alert("Order cancelled successfully");
//         refetch();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to cancel order");
//     }
//   };

//   // Change order status
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/orders/${orderId}`, {
//         status: newStatus,
//       });
//       if (res.data?.message) {
//         alert("Order status updated successfully");
//         refetch();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update order status");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="text-center py-20 text-lg text-indigo-900">
//         Loading orders...
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50 rounded-2xl shadow-lg">
//       <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-900">
//         Orders for Your Books
//       </h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border border-indigo-100 rounded-xl shadow-md bg-white">
//             <thead className="bg-gradient-to-r from-teal-200 to-indigo-200 text-indigo-900">
//               <tr>
//                 <th>#</th>
//                 <th>Book Title</th>
//                 <th>User Email</th>
//                 <th>Status</th>
//                 <th>Payment Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map((order, index) => (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-indigo-50 transition-colors duration-300"
//                 >
//                   <td>{index + 1}</td>
//                   <td>{order.bookTitle || "Unknown Book"}</td>
//                   <td>{order.userEmail}</td>
//                   <td>
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order._id, e.target.value)
//                       }
//                       className="border rounded px-2 py-1 text-sm"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                     </select>
//                   </td>
//                   <td>
//                     <span
//                       className={`badge px-3 py-1 rounded-full text-sm font-semibold ${
//                         order.paymentStatus === "paid"
//                           ? "bg-green-300 text-green-900"
//                           : "bg-yellow-300 text-yellow-900"
//                       }`}
//                     >
//                       {order.paymentStatus}
//                     </span>
//                   </td>
//                   <td>
//                     {order.status !== "delivered" && (
//                       <button
//                         className="btn btn-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
//                         onClick={() => handleCancel(order._id)}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LibrarianOrders;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LibrarianOrders = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch orders for librarian's books
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarian-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/librarian");
      return res.data;
    },
  });

  // 🔹 Change order status (pending → shipped → delivered)
  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await axiosSecure.patch(
        `/orders/status/${orderId}`,
        { status }
      );

      if (res.data?.modifiedCount) {
        alert("Order status updated");
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // 🔹 Cancel order (ONLY pending)
  const handleCancel = async (orderId) => {
    try {
      const res = await axiosSecure.patch(
        `/orders/status/${orderId}`,
        { status: "cancelled" }
      );

      if (res.data?.modifiedCount) {
        alert("Order cancelled");
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Librarian Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          No orders found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>User Email</th>
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

                  <td>{order.userEmail}</td>

                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* STATUS */}
                  <td className="capitalize font-semibold">
                    {order.status}
                  </td>

                  {/* ✅ ACTIONS */}
                  <td>
                    {/* Status dropdown */}
                    {order.status !== "cancelled" && (
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    )}

                    {/* Cancel button */}
                    {order.status === "pending" && (
                      <button
                        onClick={() =>
                          handleCancel(order._id)
                        }
                        className="ml-2 btn btn-sm bg-red-500 text-white"
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
    </div>
  );
};

export default LibrarianOrders;
