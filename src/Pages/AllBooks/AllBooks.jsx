import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllBooks = () => {
  const books = useLoaderData(); // This gets the result from the loader

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">All Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="shadow-lg rounded-xl p-4 border hover:shadow-xl transition"
          >
            <img
              src={book.bookImage || book.image}
              alt={book.bookName || book.title}
              className="w-full h-56 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">
              {book.bookName || book.title}
            </h2>
            <p className="text-gray-600 text-sm">
              Author: {book.bookAuthor || book.author}
            </p>
            {book.description && (
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {book.description}
              </p>
            )}

            <Link to={`/books/${book._id}`}>
              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
