
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [user?.email, axiosSecure]);

  if (!profile)
    return (
      <p className="text-center text-gray-500 py-20">
        {error || "Loading profile..."}
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr  to-indigo-100 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-indigo-900 tracking-wide">
        BookCourier Profile
      </h2>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden">
        {/* Avatar */}
        <div className="bg-gradient-to-tr from-indigo-200 to-indigo-100 p-6 text-center">
          <span className="inline-block w-24 h-24 rounded-full bg-white text-4xl font-bold flex items-center justify-center shadow">
            {(profile.displayName || profile.name)?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4 text-gray-700">
          <p>
            <strong>Name:</strong> {profile.displayName || profile.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role || "User"}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {profile.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-pink-50 p-4 text-center text-indigo-600 font-medium">
          🚚 Track all your book deliveries and orders here!
        </div>
      </div>
    </div>
  );
};

export default MyProfile;































