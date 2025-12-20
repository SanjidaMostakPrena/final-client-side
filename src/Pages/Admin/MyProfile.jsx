
// import React, { useEffect, useState } from "react";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MyProfile = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await axiosSecure.get(`/users/${user.email}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Profile fetch error:", err);
//         setError("Failed to fetch profile.");
//       }
//     };

//     fetchProfile();
//   }, [user?.email, axiosSecure]);

//   if (!profile)
//     return (
//       <p className="text-center text-gray-500 py-20">
//         {error || "Loading profile..."}
//       </p>
//     );

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-tr  to-indigo-100 flex flex-col items-center">
//       <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-indigo-900 tracking-wide">
//         BookCourier Profile
//       </h2>

//       <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden">
//         {/* Avatar */}
//         <div className="bg-gradient-to-tr from-indigo-200 to-indigo-100 p-6 text-center">
//           <span className="inline-block w-24 h-24 rounded-full bg-white text-4xl font-bold flex items-center justify-center shadow">
//             {(profile.displayName || profile.name)?.charAt(0).toUpperCase() || "U"}
//           </span>
//         </div>

//         {/* Profile Info */}
//         <div className="p-6 space-y-4 text-gray-700">
//           <p>
//             <strong>Name:</strong> {profile.displayName || profile.name || "N/A"}
//           </p>
//           <p>
//             <strong>Email:</strong> {profile.email}
//           </p>
//           <p>
//             <strong>Role:</strong> {profile.role || "User"}
//           </p>
//           <p>
//             <strong>Joined:</strong>{" "}
//             {profile.createdAt
//               ? new Date(profile.createdAt).toLocaleDateString()
//               : "N/A"}
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-pink-50 p-4 text-center text-indigo-600 font-medium">
//           🚚 Track all your book deliveries and orders here!
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;




import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [ordersCount, setOrdersCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfileAndStats = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);

        // Fetch user stats for chart
        const ordersRes = await axiosSecure.get(`/user/orders/${encodeURIComponent(user.email)}`);
        const paymentsRes = await axiosSecure.get(`/user/payments/${encodeURIComponent(user.email)}`);
        setOrdersCount(Array.isArray(ordersRes.data) ? ordersRes.data.length : 0);
        setPaymentsCount(Array.isArray(paymentsRes.data) ? paymentsRes.data.length : 0);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to fetch profile or stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndStats();
  }, [user?.email, axiosSecure]);

  if (loading)
    return (
      <p className="text-center text-gray-500 py-20">
        {error || "Loading profile..."}
      </p>
    );

  const chartData = {
    labels: ["Orders", "Paid Payments"],
    datasets: [
      {
        label: "Count",
        data: [ordersCount, paymentsCount],
        backgroundColor: ["#4ade80", "#60a5fa"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Your Activity Overview", font: { size: 18 } },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-indigo-50 to-indigo-100">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-900 text-center">
        BookCourier Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden p-6 flex flex-col items-center">
          <div className="bg-gradient-to-tr from-indigo-200 to-indigo-100 p-4 rounded-full">
            <span className="inline-block w-24 h-24 rounded-full bg-white text-4xl font-bold flex items-center justify-center shadow">
              {(profile.displayName || profile.name)?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="mt-6 space-y-2 text-gray-700 text-center">
            <p><strong>Name:</strong> {profile.displayName || profile.name || "N/A"}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role || "User"}</p>
            <p>
              <strong>Joined:</strong>{" "}
              {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="mt-6 bg-gradient-to-r from-purple-50 via-purple-100 to-pink-50 p-3 text-indigo-600 font-medium rounded-xl text-center w-full">
            🚚 Track your book deliveries and orders here!
          </div>
        </div>

        {/* Activity Cards */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-100 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-indigo-700">{ordersCount}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Total Paid Payments</h3>
            <p className="text-3xl font-bold text-green-700">{paymentsCount}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MyProfile;



























