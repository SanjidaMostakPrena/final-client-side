import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/books?addedBy=librarian")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  const togglePublish = (bookId, status) => {
    const newStatus = status === "published" ? "unpublished" : "published";
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(() => {
        setBooks(
          books.map((b) => (b.id === bookId ? { ...b, status: newStatus } : b))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Book Name</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">
                <img src={book.bookImage} alt={book.bookName} className="w-16 h-16 object-cover" />
              </td>
              <td className="border p-2">{book.bookName}</td>
              <td className="border p-2">{book.bookAuthor}</td>
              <td className="border p-2 capitalize">{book.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => togglePublish(book.id, book.status)}
                >
                  {book.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="btn bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => navigate(`/dashboard/edit-book/${book.id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
