
// import React, { useState } from "react";
// import useAuth from "../../Hooks/useAuth";

// const AddBook = () => {
//   const { user } = useAuth(); // logged-in librarian
//   const [formData, setFormData] = useState({
//     name: "",
//     author: "",
//     price: "",
//     status: "published",
//     description: "",
//     cover: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.email) {
//       setMessage("User not logged in");
//       return;
//     }

//     const payload = {
//       ...formData,
//       addedBy: user.email,
//       price: parseFloat(formData.price),
//     };

//     try {
//       setLoading(true);
//       const res = await fetch("  http://localhost:5000/librarian/books", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (data.success) {
//         setMessage(data.message);
//         setFormData({
//           name: "",
//           author: "",
//           price: "",
//           status: "published",
//           description: "",
//           cover: "",
//         });
//       } else {
//         setMessage(data.error || "Failed to add book");
//       }
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       setMessage("Failed to add book");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
//       {message && <p className="mb-4 text-red-500">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold">Book Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
//         </div>
//         <div>
//           <label className="block font-semibold">Author:</label>
//           <input type="text" name="author" value={formData.author} onChange={handleChange} className="input input-bordered w-full" required />
//         </div>
//         <div>
//           <label className="block font-semibold">Price:</label>
//           <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" required />
//         </div>
//         <div>
//           <label className="block font-semibold">Status:</label>
//           <select name="status" value={formData.status} onChange={handleChange} className="select select-bordered w-full">
//             <option value="published">Published</option>
//             <option value="unpublished">Unpublished</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-semibold">Description:</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" />
//         </div>
//         <div>
//           <label className="block font-semibold">Cover Image URL:</label>
//           <input type="text" name="cover" value={formData.cover} onChange={handleChange} className="input input-bordered w-full" />
//         </div>
//         <button type="submit" className="btn btn-teal w-full" disabled={loading}>
//           {loading ? "Adding..." : "Add Book"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";

const AddBook = () => {
  const { user } = useAuth(); // logged-in librarian
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    status: "published",
    description: "",
    cover: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage("User not logged in");
      return;
    }

    const payload = {
      ...formData,
      addedBy: user.email,
      price: parseFloat(formData.price),
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/librarian/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setMessage(data.message);
        setFormData({
          name: "",
          author: "",
          price: "",
          status: "published",
          description: "",
          cover: "",
        });
      } else {
        setMessage(data.error || "Failed to add book");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage("Failed to add book");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Book Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Price:</label>
          <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} className="select select-bordered w-full">
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" />
        </div>
        <div>
          <label className="block font-semibold">Cover Image URL:</label>
          <input type="text" name="cover" value={formData.cover} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-teal w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
