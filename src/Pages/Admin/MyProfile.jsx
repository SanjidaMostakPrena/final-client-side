
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
        setName(res.data.displayName || res.data.name || "");
        setPhotoURL(res.data.photoURL || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [user?.email, axiosSecure]);

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const updatedData = {
        displayName: name,
        photoURL,
      };

      await axiosSecure.patch(
        `/users/profile/${user.email}`,
        updatedData
      );

      setProfile((prev) => ({
        ...prev,
        ...updatedData,
      }));

      toast.success("Profile updated successfully 🎉");
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Profile update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <p className="text-center text-gray-500 py-20">
        {error || "Loading profile..."}
      </p>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-indigo-50 to-indigo-100 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold mb-10 text-indigo-900">
        BookCourier Profile
      </h2>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* ================= AVATAR ================= */}
        <div className="bg-indigo-100 p-6 text-center">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow"
            />
          ) : (
            <div className="w-28 h-28 mx-auto rounded-full bg-white flex items-center justify-center text-4xl font-bold text-indigo-700 shadow">
              {(name || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* ================= INFO ================= */}
        <div className="p-6 space-y-4">
          {editMode ? (
            <>
              <div>
                <label className="text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {profile.displayName || profile.name}
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
            </>
          )}
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="p-6 flex gap-3">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 border py-2 rounded-xl"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-gradient-to-r from-teal-400 to-indigo-500 text-white py-2 rounded-xl"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
