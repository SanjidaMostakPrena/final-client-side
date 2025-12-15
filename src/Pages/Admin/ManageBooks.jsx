import React, { useEffect, useState } from "react";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  const togglePublish = (bookId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(() => {
        setBooks(
          books.map((book) =>
            book.id === bookId ? { ...book, status: newStatus } : book
          )
        );
        alert(`Book is now ${newStatus}`);
      })
      .catch((err) => console.error(err));
  };

  // Delete a book and its orders
  const handleDelete = (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book? This will also delete all related orders."))
      return;

    // Delete book
    fetch(`http://localhost:3000/books/${bookId}`, { method: "DELETE" })
      .then(() => {
        // Optionally delete orders for that book
        fetch(`http://localhost:3000/orders?bookId=${bookId}`, { method: "DELETE" });
        setBooks(books.filter((book) => book.id !== bookId));
        alert("Book and related orders deleted successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Book Name</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.bookName}</td>
              <td className="border p-2">{book.bookAuthor}</td>
              <td className="border p-2 capitalize">{book.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => togglePublish(book.id, book.status)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  {book.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
