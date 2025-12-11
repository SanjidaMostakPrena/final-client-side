import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, setUser } = useAuth(); // user info from context
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.photo || "");

  // Update Profile Mutation
  const updateMutation = useMutation({
    mutationFn: async (profileData) => {
      const res = await axiosSecure.put(`/users/${user?.email}`, profileData);
      return res.data;
    },
    onSuccess: (data) => {
      // Update local auth context
      setUser(data);

      alert("Profile updated successfully");
    },
  });

  // Submit Form
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProfile = {
      name,
      photo: image,
    };

    updateMutation.mutate(updatedProfile);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* USER INFO CARD */}
      <div className="flex items-center gap-4 p-4 bg-base-100 rounded-lg shadow">
        <img
          src={user?.photo || "https://i.ibb.co/fQpZ2q0/default-avatar.png"}
          alt="User"
          className="w-20 h-20 rounded-full border object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-xs text-primary font-bold mt-1">
            Role: {user?.role?.toUpperCase()}
          </p>
        </div>
      </div>

      {/* UPDATE FORM */}
      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Profile Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
