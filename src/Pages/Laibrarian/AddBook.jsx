

import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("User not logged in ❌");
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
        toast.success(data.message || "Book added successfully ✅");
        setFormData({
          name: "",
          author: "",
          price: "",
          status: "published",
          description: "",
          cover: "",
        });
      } else {
        toast.error(data.error || "Failed to add book ❌");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Failed to add book ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-lg shadow-lg bg-white text-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold">Add New Book</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Book Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-white text-black border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="input input-bordered w-full bg-white text-black border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full bg-white text-black border-gray-300"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered w-full bg-white text-black border-gray-300"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-white text-black border-gray-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Cover Image URL:</label>
          <input
            type="text"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="input input-bordered w-full bg-white text-black border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="btn w-full bg-teal-500 hover:bg-teal-600 text-white transition font-bold py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default AddBook;
