import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/user/${encodeURIComponent(user.email)}`
        );

        if (!res.ok) throw new Error("Profile not found");

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p><strong>Name:</strong> {profile.name || "N/A"}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p>
        <strong>Joined:</strong>{" "}
        {profile.createdAt
          ? new Date(profile.createdAt).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  );
};

export default MyProfile;
