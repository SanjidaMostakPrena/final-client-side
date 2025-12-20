// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // Fetch user orders
//   const {
//     data: orders = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["orders", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       if (!user?.email) return [];
//       const res = await axiosSecure.get(
//         `/user/orders/${encodeURIComponent(user.email)}`
//       );
//       return res.data;
//     },
//   });

//   // Cancel order
//   const handleCancel = async (orderId) => {
//     try {
//       const res = await axiosSecure.patch(`/orders/${orderId}`, {
//         status: "cancelled",
//       });

//       if (res.data?.message) {
//         alert("Order cancelled successfully");
//         refetch();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to cancel order");
//     }
//   };

//   // Pay Now using Stripe
//   const handlePayNow = async (order) => {
//     try {
//       // 🔹 Use your backend server URL (axiosSecure baseURL) to create Stripe session
//       const res = await axiosSecure.post("/create-checkout-session", {
//         orderId: order._id,
//         amount: order.amount,
//         bookTitle: order.bookTitle,
//         userEmail: order.userEmail,
//       });

//       if (res.data?.url) {
//         // redirect user to Stripe Checkout
//         window.location.href = res.data.url;
//       } else {
//         alert("Failed to create Stripe session");
//       }
//     } catch (err) {
//       console.error("Stripe payment error:", err);
//       alert("Payment error occurred");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="text-center py-20 text-lg text-indigo-900">
//         Loading your orders...
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50 rounded-2xl shadow-lg">
//       <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-900">
//         My Orders
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
//                 <th>Order Date</th>
//                 <th>Status</th>
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
//                   <td>
//                     {order.createdAt
//                       ? new Date(order.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td>
//                     <span
//                       className={`badge px-3 py-1 rounded-full text-sm font-semibold ${
//                         order.status === "pending"
//                           ? "bg-yellow-300 text-yellow-900"
//                           : order.status === "paid"
//                           ? "bg-green-300 text-green-900"
//                           : order.status === "cancelled"
//                           ? "bg-red-300 text-red-900"
//                           : "bg-gray-300 text-gray-700"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>

//                   <td className="flex flex-col sm:flex-row gap-3">
//                     {order.status === "pending" && (
//   <>
//     <button
//       className="btn btn-sm bg-red-500 text-white"
//       onClick={() => handleCancel(order._id)}
//     >
//       Cancel
//     </button>

//     <button
//       className="btn btn-sm bg-indigo-500 text-white"
//       onClick={() => handlePayNow(order)}
//     >
//       Pay Now
//     </button>
//   </>
// )}

// {order.status !== "pending" && (
//   <span className="italic text-gray-500">
//     No Actions Available
//   </span>
// )}

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

// export default MyOrders;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user orders
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

  // Cancel order
  const handleCancel = async (orderId) => {
    try {
      const res = await axiosSecure.patch(`/orders/${orderId}`, {
        status: "cancelled",
      });

      if (res.data?.message) {
        toast.success("Order cancelled successfully!");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  // Pay Now using Stripe
  const handlePayNow = async (order) => {
    try {
      // 🔹 Use your backend server URL (axiosSecure baseURL) to create Stripe session
      const res = await axiosSecure.post("/create-checkout-session", {
        orderId: order._id,
        amount: order.amount,
        bookTitle: order.bookTitle,
        userEmail: order.userEmail,
      });

      if (res.data?.url) {
        // redirect user to Stripe Checkout
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create Stripe session");
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      toast.error("Payment error occurred");
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
                    {order.status === "pending" && (
                      <>
                        <button
                          className="btn btn-sm bg-red-500 text-white"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </button>

                        <button
                          className="btn btn-sm bg-indigo-500 text-white"
                          onClick={() => handlePayNow(order)}
                        >
                          Pay Now
                        </button>
                      </>
                    )}

                    {order.status !== "pending" && (
                      <span className="italic text-gray-500">
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default MyOrders;
