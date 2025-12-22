
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
import { FaBook } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (role?.toLowerCase() === "librarian" && user?.email) {
          const booksRes = await axiosSecure.get(`/librarian/books?email=${user.email}`);
          setTotalBooks(Array.isArray(booksRes.data) ? booksRes.data.length : 0);
        }
      } catch (err) {
        console.error("Failed to fetch librarian stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user, role, axiosSecure]);

  if (loading)
    return (
      <div className="text-center py-20 text-lg text-indigo-900 animate-pulse">
        Loading dashboard...
      </div>
    );

  const chartData = {
    labels: ["Total Books Added"],
    datasets: [
      {
        label: "Count",
        data: [totalBooks],
        backgroundColor: ["#60a5fa"], 
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Librarian Dashboard - Total Books Added",
        font: { size: 20 },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-indigo-900 tracking-wide">
            Welcome, {user?.name || "Librarian"}
          </h1>
          <p className="text-gray-700 font-medium">
            Role: <span className="text-indigo-800">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <FaBook className="text-6xl text-blue-400 animate-bounce" />
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center">
          <h2 className="text-xl font-semibold mb-2 text-indigo-900">Total Books Added</h2>
          <p className="text-4xl md:text-5xl font-bold text-blue-500 animate-pulse">{totalBooks}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-2xl border border-indigo-100 transform hover:scale-[1.02] transition-all duration-300">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
