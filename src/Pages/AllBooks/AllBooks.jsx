
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AllBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");

//   const fetchBooks = async (currentSearch = search, currentSort = sort) => {
//     try {
//       let url = `https://courierapp-three.vercel.app/books?`;
//       if (currentSearch) url += `search=${encodeURIComponent(currentSearch)}&`;
//       if (currentSort) url += `sort=${currentSort}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch books");
//       const data = await res.json();
//       setBooks(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     fetchBooks();
//   }, [search, sort]);

//   if (loading)
//     return (
//       <div className="text-center py-20 text-lg text-indigo-900">
//         Loading books...
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50">
//       <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-900">
//         All Books
//       </h1>

//       {/* Search & Sort */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
//         <input
//           type="text"
//           placeholder="Search by book name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="input input-bordered w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
//         />
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="select select-bordered w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
//         >
//           <option value="">Sort by Price</option>
//           <option value="asc">Low → High</option>
//           <option value="desc">High → Low</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {books.map((book, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-indigo-100 hover:border-teal-300 flex flex-col"
//           >
//             <div className="h-64 overflow-hidden rounded-t-2xl">
//               <img
//                 src={book.cover || "/default-book.png"} // use JSON cover
//                 alt={book.name}
//                 className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//             <div className="p-5 flex flex-col flex-1">
//               <h2 className="text-xl font-semibold mb-2 text-indigo-900">
//                 {book.name}
//               </h2>
//               <p className="text-gray-600 mb-2">Author: {book.author}</p>
//               <p className="text-gray-800 font-semibold mb-2">
//                 Price: ${book.price}
//               </p>
//               <p className="text-gray-700 mb-4 flex-1">{book.description}</p>


//               <Link
//                 to={`/books/${book._id}`}
//                 className="mt-auto inline-block w-full bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-indigo-500 hover:to-teal-400 text-white py-2 rounded-xl font-semibold transition-all duration-300 text-center"
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

// export default AllBooks;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 8; // number of books per page

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [page, setPage] = useState(1);

  // Fetch all books once
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://courierapp-three.vercel.app/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setAllBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allBooks];

    // Search
    if (search) {
      filtered = filtered.filter(book =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(book => book.status === statusFilter);
    }

    // Price filter
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter(book => book.price >= min && book.price <= max);
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }

    setBooks(filtered);
    setPage(1); // Reset to first page when filters change
  }, [allBooks, search, statusFilter, priceFilter, sort]);

  // Pagination
  const totalPages = Math.ceil(books.length / PAGE_SIZE);
  const paginatedBooks = books.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-gray-700 flex flex-col h-[450px]">
      <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-t-2xl" />
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
          <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded w-full mt-2" />
        </div>
        <div className="h-10 bg-gray-400 dark:bg-gray-500 rounded w-full mt-4" />
      </div>
    </div>
  );

  return (
    <div
      className="max-w-7xl mx-auto px-4 md:px-14 py-14
      bg-gradient-to-b from-indigo-50 via-white to-teal-50
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      transition-colors duration-500"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-900 dark:text-indigo-200">
        All Books
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input w-full sm:w-1/2
            bg-white dark:bg-gray-700 text-indigo-900 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400
            border border-gray-300 dark:border-gray-600 rounded-xl
            px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent
            transition-colors duration-500"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="select w-full sm:w-1/4
            bg-white dark:bg-gray-700 text-indigo-900 dark:text-gray-200
            border border-gray-300 dark:border-gray-600 rounded-xl
            px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            transition-colors duration-500"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <select
          value={priceFilter}
          onChange={e => setPriceFilter(e.target.value)}
          className="select w-full sm:w-1/4
            bg-white dark:bg-gray-700 text-indigo-900 dark:text-gray-200
            border border-gray-300 dark:border-gray-600 rounded-xl
            px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            transition-colors duration-500"
        >
          <option value="">All Prices</option>
          <option value="0-12">0 - 12$</option>
          <option value="12-15">12 - 15$</option>
          <option value="15-30">15 - 30$</option>
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="select w-full sm:w-1/4
            bg-white dark:bg-gray-700 text-indigo-900 dark:text-gray-200
            border border-gray-300 dark:border-gray-600 rounded-xl
            px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            transition-colors duration-500"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
        </select>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : paginatedBooks.length === 0 ? (
        <p className="text-center text-indigo-900 dark:text-indigo-300 text-lg">
          No books found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl
                transition-all duration-500 overflow-hidden border border-indigo-100 dark:border-gray-700 flex flex-col h-[450px]"
            >
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={book.cover || "/default-book.png"}
                  alt={book.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2 text-indigo-900 dark:text-indigo-200">
                  {book.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Author: {book.author}
                </p>
                <p className="text-gray-800 dark:text-gray-100 font-semibold mb-2">
                  Price: ${book.price}
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-4 flex-1">
                  {book.description}
                </p>
                <Link
                  to={`/books/${book._id}`}
                  className="mt-auto inline-block w-full
                    bg-gradient-to-r from-teal-400 to-indigo-500
                    dark:from-teal-500 dark:to-indigo-600
                    hover:from-indigo-500 hover:to-teal-400
                    dark:hover:from-indigo-600 dark:hover:to-teal-500
                    text-white py-2 rounded-xl font-semibold
                    text-center transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-xl font-semibold transition
                ${page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-700 text-indigo-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
