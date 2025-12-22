
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: "",
    cover: "",
    status: "published",
    author: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${id}`);
        setBook({ ...res.data });
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch book ❌");
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) =>
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/books/${id}`, book);
      toast.success("Book updated successfully ✅");
      navigate("/dashboard/my-book", { state: { updated: true } });

    } catch (err) {
      console.error(err);
      toast.error("Failed to update book ❌");
    }
  };

  if (loading)
    return (
      <p className="p-4 text-center text-indigo-900 font-semibold">Loading...</p>
    );

  return (
    <div className="p-6 max-w-lg mx-auto bg-gradient-to-b from-indigo-50 to-white shadow-2xl rounded-2xl border border-indigo-200">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-900 text-center">
        ✏️ Edit Book
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1 text-indigo-800">Book Name</label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-800">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-800">Price</label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-800">Book Image URL</label>
          <input
            type="text"
            name="cover"
            value={book.cover}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {book.cover && (
            <img
              src={book.cover}
              alt={book.name}
              className="h-32 w-32 object-cover rounded-lg mt-2 shadow-md border"
            />
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-800">Status</label>
          <select
            name="status"
            value={book.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-indigo-800">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all"
        >
          Update Book
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default EditBook;
