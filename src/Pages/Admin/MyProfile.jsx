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

  if (!profile) return <p className="text-center text-gray-500">{error || "Loading profile..."}</p>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-700 tracking-wide">📦 BookCourier Profile</h2>
      
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-purple-200 overflow-hidden">
        {/* Avatar / Initial */}
        <div className="bg-purple-100 p-5 text-center">
          <span className="inline-block bg-purple-400 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold text-white">
            {profile.displayName ? profile.displayName.charAt(0) : "U"}
          </span>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4 text-gray-800">
          <p><strong>Name:</strong> {profile.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role || "User"}</p>
          <p><strong>Joined:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>

        {/* Footer message */}
        <div className="bg-purple-50 p-4 text-center text-purple-600 font-medium">
          🚚 Track all your book deliveries and orders here!
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
