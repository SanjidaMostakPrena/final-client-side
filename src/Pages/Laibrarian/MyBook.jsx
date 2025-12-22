import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

 
  const fetchBooks = () => {
    if (user?.email) {
      fetch(`http://localhost:5000/librarian/books?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBooks();
    }
  }, [user]);

  
  useEffect(() => {
    if (location.state?.updated) {
      toast.success("📚 Book updated successfully!");
      fetchBooks(); 
      window.history.replaceState({}, document.title); 
    }
  }, [location.state?.updated]);

  const togglePublish = (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    fetch(`http://localhost:5000/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id ? { ...book, status: newStatus } : book
          )
        );
        toast.success(
          `Book has been ${newStatus === "published" ? "published ✅" : "unpublished ⚠️"}`
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update status ❌");
      });
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        📚 My Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center">No books added yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-300">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-black">
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
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-100 transition-colors">
                  <td className="border p-2">
                    <img
                      src={book.cover || book.image || "/default-book.png"}
                      alt={book.name || book.title}
                      className="w-16 h-16 object-cover rounded shadow-sm"
                    />
                  </td>
                  <td className="border p-2 font-medium">{book.name || book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2 font-semibold">₹{book.price}</td>
                  <td className="border p-2 capitalize font-medium">{book.status}</td>
                  <td className="border p-2">{book.description || "-"}</td>
                  <td className="border-l-4 p-2 flex flex-col sm:flex-row gap-2">
                    <button
                      className={`btn px-3 py-1 rounded font-semibold transition 
                        ${book.status === "published"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-yellow-400 hover:bg-yellow-500 text-white"
                        }`}
                      onClick={() => togglePublish(book._id, book.status)}
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      className="btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
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

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default MyBooks;
