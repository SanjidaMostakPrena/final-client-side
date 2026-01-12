
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const LatestBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const fetchBooks = async () => {
//     try {
//       const res = await fetch("https://courierapp-three.vercel.app/books/latest");

//       if (!res.ok) throw new Error("Failed to fetch books");

//       const data = await res.json();

//       if (Array.isArray(data)) {
//         setBooks(data);
//       } else if (data.books && Array.isArray(data.books)) {
//         setBooks(data.books);
//       } else {
//         setBooks([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10 text-lg">Loading books...</div>;
//   }

//   if (!Array.isArray(books) || books.length === 0) {
//     return <div className="text-center py-10 text-lg">No books found</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-indigo-900">
//         Latest Books
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {books.slice(0, 4).map((book) => (
//           <div
//             key={book._id}
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
//           >
//             <div className="h-64 overflow-hidden">
//               <img
//                 src={book.cover || "/default-book.png"}
//                 alt={book.name}
//                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             <div className="p-4 flex flex-col flex-1">
//               <h2 className="text-xl font-semibold mb-1">
//                 {book.name}
//               </h2>

//               <p className="text-gray-600 mb-1">
//                 Author: {book.author}
//               </p>

//               <p className="text-gray-800 font-semibold mb-2">
//                 Price: ${book.price}
//               </p>

//               <p className="text-gray-700 text-sm mb-4 flex-1">
//                 {book.description}
//               </p>

//               <Link
//                 to={`/books/${book._id}`}
//                 className="block text-center bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 rounded-lg shadow hover:brightness-110 transition-all duration-300"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

// };

// export default LatestBooks;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch("https://courierapp-three.vercel.app/books/latest");

      if (!res.ok) throw new Error("Failed to fetch books");

      const data = await res.json();

      if (Array.isArray(data)) {
        setBooks(data);
      } else if (data.books && Array.isArray(data.books)) {
        setBooks(data.books);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg text-indigo-900 dark:text-gray-200">
        Loading books...
      </div>
    );
  }

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <div className="text-center py-10 text-lg text-indigo-900 dark:text-gray-200">
        No books found
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-900 dark:text-white">
        Latest Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.slice(0, 4).map((book) => (
          <div
            key={book._id}
            className="
              bg-white dark:bg-gray-900
              shadow-md dark:shadow-lg
              rounded-lg overflow-hidden
              hover:shadow-xl transition-shadow duration-300
              flex flex-col
            "
          >
            {/* Image */}
            <div className="h-64 overflow-hidden">
              <img
                src={book.cover || "/default-book.png"}
                alt={book.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-1 text-indigo-900 dark:text-white">
                {book.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Author: {book.author}
              </p>

              <p className="text-indigo-800 dark:text-indigo-300 font-semibold mb-2">
                Price: ${book.price}
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1">
                {book.description}
              </p>

              <Link
                to={`/books/${book._id}`}
                className="
                  block text-center
                  bg-teal-500 hover:bg-teal-600
                  text-white font-semibold
                  py-2 rounded-lg shadow
                  transition-all duration-300
                "
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;
