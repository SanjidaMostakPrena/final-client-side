
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({ name: "", cover: "", status: "published", author: "", price: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${id}`);
        setBook({ ...res.data });
        setLoading(false);
      } catch (err) { console.error(err); alert("Failed to fetch book"); setLoading(false); }
    };
    fetchBook();
  }, [id]);

  const handleChange = e => setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/books/${id}`, book);
      alert("Book updated successfully!");
      navigate("/dashboard/my-book");
    } catch (err) { console.error(err); alert("Failed to update book"); }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-indigo-900">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Book Name</label>
          <input type="text" name="name" value={book.name} onChange={handleChange} className="w-full border p-2 rounded" required/>
        </div>
        <div>
          <label className="block font-medium mb-1">Author</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} className="w-full border p-2 rounded" required/>
        </div>
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input type="number" name="price" value={book.price} onChange={handleChange} className="w-full border p-2 rounded" required/>
        </div>
        <div>
          <label className="block font-medium mb-1">Book Image URL</label>
          <input type="text" name="cover" value={book.cover} onChange={handleChange} className="w-full border p-2 rounded"/>
        </div>
        {book.cover && <img src={book.cover} alt={book.name} className="h-32 w-32 object-cover rounded border"/>}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select name="status" value={book.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={book.description} onChange={handleChange} className="w-full border p-2 rounded"/>
        </div>
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
