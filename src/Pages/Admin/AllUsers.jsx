import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const AllUsers = () => {
  const { role: currentUserRole, loading: authLoading } =
    useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("  http://localhost:5000/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && currentUserRole === "admin") {
      fetchUsers();
    }
    if (!authLoading && currentUserRole !== "admin") {
      setLoading(false);
    }
  }, [authLoading, currentUserRole]);

  if (authLoading) {
    return (
      <p className="text-center mt-20 text-gray-700 font-medium">
        🔐 Checking permission...
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-700 font-medium">
        📦 Loading users...
      </p>
    );
  }

  if (currentUserRole !== "admin") {
    return (
      <p className="text-center mt-20 text-red-600 font-semibold">
        🚫 You do not have permission to view this page.
      </p>
    );
  }

  const updateRole = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white text-black">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-black">
          📚 BookCourier Admin Panel
        </h1>
        <p className="text-gray-600 mt-2">
          Manage registered users & assign roles
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-md">
        <table className="min-w-full bg-white text-black">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-4 px-4 text-left font-semibold">User</th>
              <th className="py-4 px-4 text-left font-semibold">Email</th>
              <th className="py-4 px-4 text-center font-semibold">Role</th>
              <th className="py-4 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
              >
                <td className="py-3 px-4 font-medium">
                  {user.name || user.displayName || "Unknown Reader"}
                </td>

                <td className="py-3 px-4">{user.email}</td>

                <td className="py-3 px-4 text-center">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-black capitalize">
                    {user.role}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    {user.role !== "librarian" && (
                      <button
                        onClick={() => updateRole(user._id, "librarian")}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                      >
                        📖 Make Librarian
                      </button>
                    )}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => updateRole(user._id, "admin")}
                        className="px-3 py-1 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                      >
                        🛡️ Make Admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
