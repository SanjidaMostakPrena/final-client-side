
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- import Link

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
 
  // Fetch books from server with search & sort
  const fetchBooks = async (currentSearch = search, currentSort = sort) => {
    try {
      let url = `  http://localhost:5000/books?`;
      if (currentSearch) url += `search=${encodeURIComponent(currentSearch)}&`;
      if (currentSort) url += `sort=${currentSort}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [search, sort]);

  if (loading)
    return (
      <div className="text-center py-20 text-lg text-indigo-900">
        Loading books...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-900">
        All Books
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-indigo-100 hover:border-teal-300 flex flex-col"
          >
            <div className="h-64 overflow-hidden rounded-t-2xl">
              <img
                src={book.cover || "/default-book.png"} // use JSON cover
                alt={book.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 text-indigo-900">
                {book.name}
              </h2>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-800 font-semibold mb-2">
                Price: ${book.price}
              </p>
              <p className="text-gray-700 mb-4 flex-1">{book.description}</p>


              <Link
                to={`/books/${book._id}`}
                className="mt-auto inline-block w-full bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-indigo-500 hover:to-teal-400 text-white py-2 rounded-xl font-semibold transition-all duration-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
