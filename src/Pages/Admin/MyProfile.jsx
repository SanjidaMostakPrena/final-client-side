
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
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
        setName(res.data.displayName || res.data.name || "");
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [user?.email, axiosSecure]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const res = await axiosSecure.put(`/users/${user.email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Failed to update profile.");
    }
  };

  if (!profile)
    return (
      <p className="text-center text-gray-500 py-20">
        {error || "Loading profile..."}
      </p>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr to-indigo-100 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-indigo-900 tracking-wide">
        BookCourier Profile
      </h2>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden">
        {/* Avatar */}
        <div className="bg-gradient-to-tr from-indigo-200 to-indigo-100 p-6 text-center relative">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto shadow object-cover"
            />
          ) : (
            <span className="inline-block w-24 h-24 rounded-full bg-white text-4xl font-bold flex items-center justify-center shadow">
              {(profile.displayName || profile.name)?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
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
            {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
          </p>

          {/* Profile Update Form (for all roles) */}
          <form onSubmit={handleProfileUpdate} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">Update Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Update Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Update Profile
            </button>

            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </form>
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



























