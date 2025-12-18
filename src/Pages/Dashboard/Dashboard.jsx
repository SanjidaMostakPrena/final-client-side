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

const Dashboard = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [ordersCount, setOrdersCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (role === "user" && user?.email) {
          // Fetch all orders for this user
          const ordersRes = await axiosSecure.get(`/user/orders/${encodeURIComponent(user.email)}`);
          // Fetch all paid payments for this user
          const paymentsRes = await axiosSecure.get(`/user/payments/${encodeURIComponent(user.email)}`);

          setOrdersCount(Array.isArray(ordersRes.data) ? ordersRes.data.length : 0);
          setPaymentsCount(Array.isArray(paymentsRes.data) ? paymentsRes.data.length : 0);
        }

        if (role === "admin") {
          // Fetch all books for admin
          const booksRes = await axiosSecure.get("/admin/books");
          setOrdersCount(Array.isArray(booksRes.data) ? booksRes.data.length : 0);
          setPaymentsCount(0); // Admin dashboard shows only total books
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, role, axiosSecure]);

  if (loading)
    return (
      <div className="text-center py-20 text-lg text-indigo-900">
        Loading dashboard...
      </div>
    );

  const chartData = {
    labels: role === "user" ? ["Orders", "Paid Payments"] : ["Total Books Added"],
    datasets: [
      {
        label: "Count",
        data: role === "user" ? [ordersCount, paymentsCount] : [ordersCount],
        backgroundColor: role === "user" ? ["#4ade80", "#60a5fa"] : ["#f87171"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: role === "user" ? "Your BookCourier Activity" : "Admin Dashboard - Total Books",
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-indigo-900">
        Welcome, {user?.name || (role === "admin" ? "Admin" : "User")}
      </h1>
      <p className="mb-6 text-gray-700">
        Role: {role.charAt(0).toUpperCase() + role.slice(1)}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`bg-indigo-100 p-6 rounded-xl shadow-lg text-center ${role === "admin" ? "md:col-span-2" : ""}`}>
          <h2 className="text-xl font-semibold mb-2">
            {role === "user" ? "Total Orders" : "Total Books Added"}
          </h2>
          <p className={`text-3xl font-bold ${role === "user" ? "text-indigo-700" : "text-red-700"}`}>
            {ordersCount}
          </p>
        </div>
        {role === "user" && (
          <div className="bg-green-100 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Total Paid Payments</h2>
            <p className="text-3xl font-bold text-green-700">{paymentsCount}</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
