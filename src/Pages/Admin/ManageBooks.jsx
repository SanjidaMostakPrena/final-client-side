import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast, Toaster } from "react-hot-toast";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const { data } = await axiosSecure.get("/admin/books");
      setBooks(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Toggle status
  const toggleStatus = async (bookId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    // Optimistic UI
    setBooks((prev) =>
      prev.map((b) => (b._id === bookId ? { ...b, status: newStatus } : b))
    );

    try {
      await axiosSecure.patch(`/books/${bookId}`, { status: newStatus });
      toast.success(`Book ${newStatus} successfully ✅`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status ❌");

      // Revert UI
      setBooks((prev) =>
        prev.map((b) => (b._id === bookId ? { ...b, status: currentStatus } : b))
      );
    }
  };

  // Delete book
  const deleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book and all related orders?")) return;

    try {
      await axiosSecure.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
      toast.success("Book deleted successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book ❌");
    }
  };

  if (loading) return <p className="text-center mt-10 text-black animate-pulse">Loading books...</p>;

  return (
    <div className="p-4 sm:p-5 max-w-full sm:max-w-6xl mx-auto bg-white rounded-xl shadow-lg text-black">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center sm:text-left text-black">Manage Books</h2>

      {books.length === 0 ? (
        <p className="text-center text-black">No books found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200">
          <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base bg-white text-black rounded-xl">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">Book Name</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                  <td className="border p-2 font-medium">{book.name || book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2 font-semibold">₹{book.price}</td>
                  <td className="border p-2 capitalize font-medium">{book.status}</td>
                  <td className="border p-2 flex flex-col sm:flex-row sm:gap-2 gap-1">
                    <button
                      onClick={() => toggleStatus(book._id, book.status)}
                      className={`px-3 py-1 rounded text-white font-semibold transition ${
                        book.status === "published"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ManageBooks;
