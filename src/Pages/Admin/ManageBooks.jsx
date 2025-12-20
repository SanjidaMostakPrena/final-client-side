// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";

// const ManageBooks = () => {
//   const axiosSecure = useAxiosSecure();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all books
//   const fetchBooks = async () => {
//     try {
//       const { data } = await axiosSecure.get("/admin/books"); // admin route
//       setBooks(data || []);
//     } catch (err) {
//       console.error("Failed to fetch books:", err);
//       toast.error("Failed to fetch books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // Publish / Unpublish book
//   const toggleStatus = async (bookId, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "published" ? "unpublished" : "published";

//       // Optimistic UI update
//       setBooks((prevBooks) =>
//         prevBooks.map((b) =>
//           (b._id || b.id) === bookId ? { ...b, status: newStatus } : b
//         )
//       );

//       const { data } = await axiosSecure.patch(`/books/${bookId}`, { status: newStatus });
//       console.log("Toggle response:", data);

//       toast.success(`Book ${newStatus} successfully`);
//     } catch (err) {
//       console.error("Failed to update status:", err);
//       toast.error("Failed to update status");

//       // Revert UI if error occurs
//       setBooks((prevBooks) =>
//         prevBooks.map((b) =>
//           (b._id || b.id) === bookId ? { ...b, status: currentStatus } : b
//         )
//       );
//     }
//   };

//   // Delete book
//   const deleteBook = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book and all related orders?")) return;

//     try {
//       await axiosSecure.delete(`/books/${bookId}`);
//       setBooks((prevBooks) => prevBooks.filter((b) => (b._id || b.id) !== bookId));
//       toast.success("Book deleted successfully");
//     } catch (err) {
//       console.error("Failed to delete book:", err);
//       toast.error("Failed to delete book");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading books...</p>;

//   return (
//     <div className="p-4 sm:p-5 max-w-full sm:max-w-6xl mx-auto">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center sm:text-left">Manage Books</h2>

//       {books.length === 0 ? (
//         <p className="text-center">No books found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Book Name</th>
//                 <th className="border p-2">Author</th>
//                 <th className="border p-2">Price</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {books.map((book) => {
//                 const bookId = book._id || book.id;
//                 return (
//                   <tr key={bookId}>
//                     <td className="border p-2">{book.bookName || book.title || book.name}</td>
//                     <td className="border p-2">{book.bookAuthor || book.author}</td>
//                     <td className="border p-2">₹{book.price}</td>
//                     <td className="border p-2 capitalize">{book.status || "unpublished"}</td>
//                     <td className="border p-2 flex flex-col sm:flex-row sm:gap-2 gap-1">
//                       <button
//                         type="button"
//                         onClick={() => toggleStatus(bookId, book.status)}
//                         className={`px-3 py-1 rounded text-white ${
//                           book.status === "published" ? "bg-blue-600" : "bg-green-600"
//                         }`}
//                       >
//                         {book.status === "published" ? "Unpublish" : "Publish"}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => deleteBook(bookId)}
//                         className="px-3 py-1 rounded bg-red-600 text-white"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBooks;
// ManageBooks.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

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
      toast.error("Failed to fetch books");
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
      toast.success(`Book ${newStatus} successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");

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
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="p-4 sm:p-5 max-w-full sm:max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center sm:text-left">Manage Books</h2>

      {books.length === 0 ? (
        <p className="text-center">No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Book Name</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="border p-2">{book.name || book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">₹{book.price}</td>
                  <td className="border p-2 capitalize">{book.status}</td>
                  <td className="border p-2 flex flex-col sm:flex-row sm:gap-2 gap-1">
                    <button
                      onClick={() => toggleStatus(book._id, book.status)}
                      className={`px-3 py-1 rounded text-white ${
                        book.status === "published" ? "bg-blue-600" : "bg-green-600"
                      }`}
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white"
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
    </div>
  );
};

export default ManageBooks;
