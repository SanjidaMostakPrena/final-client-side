
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/librarian/books?email=${user.email}`)
        .then(res => res.json())
        .then(data => setBooks(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const togglePublish = (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    fetch(`http://localhost:5000/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book._id === id ? { ...book, status: newStatus } : book
          )
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 bg-gradient-to-b from-indigo-50 via-white to-teal-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-900">📚 My Books</h2>

      {books.length === 0 ? (
        <p className="text-center text-indigo-900">No books added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-indigo-100 text-indigo-900">
              <tr>
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-left">Book Name</th>
                <th className="border p-3 text-left">Author</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id} className="hover:bg-indigo-50 transition-colors">
                  <td className="border p-2">
                    <img
                      src={book.cover || book.image || "/default-book.png"}
                      alt={book.name || book.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2">{book.name || book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">₹{book.price}</td>
                  <td className="border p-2 capitalize">{book.status}</td>
                  <td className="border p-2">{book.description || "-"}</td>
                  <td className="border-l-4 p-2 flex flex-col sm:flex-row gap-2">
                    <button
                      className="btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => togglePublish(book._id, book.status)}
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
