
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

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ================= Fetch Profile =================
  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
        setName(res.data.name || res.data.displayName || "");
        setImage(res.data.image || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [user?.email, axiosSecure]);

  // ================= Update Profile =================
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
     await axiosSecure.patch(
  `/users/update-profile/${profile._id}`,
  { name, image }
);

      // refresh profile
      const res = await axiosSecure.get(`/users/${user.email}`);
      setProfile(res.data);

      setSuccess("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <p className="text-center py-20 text-gray-500">
        {error || "Loading profile..."}
      </p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-50 p-6 text-center text-white">
          <div className="flex justify-center mb-3">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white text-indigo-900 flex items-center justify-center text-4xl font-bold">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold">{name || "User"}</h2>
          <p className="text-sm opacity-90">{profile.email}</p>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Role</span>
            <span className="capitalize">{profile.role || "user"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined</span>
            <span>
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4 border-t">
          <h3 className="text-lg font-semibold text-indigo-700">
            ✏️ Update Profile
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://image-link.com/photo.jpg"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-900 transition font-semibold"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {success && <p className="text-green-600 text-sm">{success}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        {/* Footer */}
        <div className="bg-indigo-50 text-center py-3 text-sm text-indigo-600">
          🚚 BookCourier • Manage your account easily
        </div>
      </div>
    </div>
  );
};

export default MyProfile;




























