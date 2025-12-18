import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) return;

    try {
      const { data: wishlistItems } = await axiosSecure.get(`/wishlist/${user.uid}`);
      const detailedWishlist = await Promise.all(
        wishlistItems.map(async (item) => {
          try {
            const { data: book } = await axiosSecure.get(`/books/${item.bookId}`);
            return {
              _id: item._id,
              bookId: item.bookId,
              name: book.name,
              author: book.author,
              price: book.price,
              cover: book.cover,
              description: book.description,
            };
          } catch (err) {
            console.error(err);
            return null;
          }
        })
      );

      setWishlist(detailedWishlist.filter(Boolean));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  if (loading)
    return (
      <div className="text-center py-10 text-indigo-900 font-semibold text-lg">
        Loading wishlist...
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="text-center py-10 text-gray-700 font-medium">
        No books in wishlist
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-900">
        My Wishlist
      </h1>
      <p className="text-center text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto px-2 sm:px-0">
        Here are the books you've saved to revisit later. Click on a book to view details or place an order.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-indigo-100 hover:border-teal-300 flex flex-col"
          >
            <div className="h-64 overflow-hidden rounded-t-2xl">
              <img
                src={book.cover || "/default-book.png"}
                alt={book.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 text-center flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 text-indigo-900">{book.name}</h2>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-700 text-sm mb-2">{book.description}</p>
              <p className="text-gray-800 font-semibold mb-4">Price: ${book.price}</p>
              <Link
                to={`/books/${book.bookId}`}
                className="mt-auto inline-block w-full bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-indigo-500 hover:to-teal-400 text-white py-2 rounded-xl font-semibold transition-all duration-300"
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

export default MyWishlist;
