import React, { useEffect, useState } from "react";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch all books
  // ===============================
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // ===============================
  // Publish / Unpublish a book
  // ===============================
  const togglePublish = (bookId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    fetch(`http://localhost:5000/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(() => {
        setBooks((prev) =>
          prev.map((book) =>
            book._id === bookId ? { ...book, status: newStatus } : book
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // ===============================
  // Delete book and related orders
  // ===============================
  const handleDelete = (bookId) => {
    if (!window.confirm("Are you sure? This will also delete all related orders.")) return;

    fetch(`http://localhost:5000/books/${bookId}`, { method: "DELETE" })
      .then(() => {
        fetch(`http://localhost:5000/orders?bookId=${bookId}`, { method: "DELETE" });
        setBooks((prev) => prev.filter((book) => book._id !== bookId));
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-700 font-medium">📦 Loading books...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white text-black">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700">📚 Manage Books</h1>
        <p className="text-gray-600 mt-2">
          Admin can publish/unpublish or delete books. Deleting a book also deletes all related orders.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-md">
        <table className="min-w-full bg-white text-black">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-4 px-4 text-left font-semibold">Book Name</th>
              <th className="py-4 px-4 text-left font-semibold">Author</th>
              <th className="py-4 px-4 text-center font-semibold">Status</th>
              <th className="py-4 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="py-3 px-4 font-medium">{book.bookName}</td>
                <td className="py-3 px-4">{book.bookAuthor}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                    book.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => togglePublish(book._id, book.status)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      book.status === "published"
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks ;