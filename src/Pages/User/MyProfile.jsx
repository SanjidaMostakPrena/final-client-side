import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, setUser } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return <p>Loading profile...</p>;
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("displayName", name);
      if (image) formData.append("photoURL", image);

      const res = await axiosSecure.patch(`/users/${user.email}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.modifiedCount > 0) {
        setMessage("Profile updated successfully!");
        setUser({ ...user, displayName: name, photoURL: image ? URL.createObjectURL(image) : user.photoURL });
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">My Profile</h2>
      <div className="bg-white shadow-md p-5 rounded-lg max-w-md">
        <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role || "User"}</p>
        <p><strong>Joined:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>

        <form onSubmit={handleUpdateProfile} className="mt-5">
          <div className="mb-3">
            <label className="block font-medium">Update Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Update Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default MyProfile;
