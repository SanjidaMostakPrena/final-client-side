import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";


const AllUsers = () => {
  const { role: currentUserRole } = useContext(AuthContext); // Admin only
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const updateRole = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        // Update local state
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        console.error("Failed to update role");
      }
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  if (loading) return <p>Loading users...</p>;

  if (currentUserRole !== "admin") {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border">{user.name || "N/A"}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.role}</td>
              <td className="py-2 px-4 border flex gap-2">
                {user.role !== "librarian" && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => updateRole(user._id, "librarian")}
                  >
                    Make Librarian
                  </button>
                )}
                {user.role !== "admin" && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => updateRole(user._id, "admin")}
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
