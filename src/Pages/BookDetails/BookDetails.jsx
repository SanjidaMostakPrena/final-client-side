
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BookDetails = () => {
//   const { id } = useParams(); 
//   const { user } = useAuth();
//   const navigate = useNavigate(); 
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [isWishlisted, setIsWishlisted] = useState(false); 
//   const axiosSecure = useAxiosSecure();

  
//   const fetchBook = async (bookId) => {
//     try {
//       const { data } = await axiosSecure.get(`/books/${bookId}`);
//       setBook(data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch book details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBook(id);
//   }, [id]);

//   // Place Order function
//   const handlePlaceOrder = async () => {
//     if (!phone || !address) return toast.error("Please fill all fields!");

//     try {
//       const orderData = {
//         bookId: book?._id,                    
//         bookTitle: book?.name || book?.bookName || book?.title,
//         userEmail: user?.email,
//         phone,
//         address,
//         status: "pending",
//         paymentStatus: "unpaid",
//         amount: book?.price || 0,
//         date: new Date().toISOString(),
//       };

//       const res = await axiosSecure.post("/orders", orderData);

//       if (res.data?.message === "Order placed successfully") {
//         toast.success("Order placed successfully!");
//         setIsModalOpen(false);
//         setPhone("");
//         setAddress("");
//         navigate("/dashboard/my-orders");
//       } else {
//         toast.error("Failed to place order");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to place order");
//     }
//   };

//   // Handle add to wishlist
//   const handleAddToWishlist = async () => {
//     if (!user) return toast.error("Please login first!");

//     try {
//       const res = await axiosSecure.post("/wishlist/add", {
//         userId: user?.uid,
//         bookId: book?._id,
//         bookName: book.name || book.title,
//         bookAuthor: book.author || book.bookAuthor,
//       });

//       if (res.data.success) {
//         toast.success("Book added to your wishlist!");
//         setIsWishlisted(true);
//         navigate("/dashboard/my-wishlist");
//       } else {
//         toast.error(res.data.message || "Failed to add to wishlist");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add to wishlist");
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading book details...</div>;
//   if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
//   if (!book) return <div className="text-center mt-10">Book not found</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Creative Book Card */}
//       <div className="flex flex-col md:flex-row gap-6 shadow-xl p-6 rounded-2xl bg-gradient-to-r from-teal-100 via-white to-teal-100">
//         {/* ✅ Show book cover image */}
//         <img
//           src={book.cover || "/default-book.png"}           
//           alt={book.name || book.title}
//           className="w-full md:w-1/3 h-80 object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
//         />
//         <div className="flex-1 flex flex-col justify-between">
//           <div>
//             <h1 className="text-4xl font-bold mb-2 text-teal-700">{book.name || book.title}</h1>
//             <p className="text-gray-700 mb-2">
//               <span className="font-semibold">Author:</span> {book.author || book.bookAuthor}
//             </p>
//             {book.description && <p className="text-gray-600 mb-4">{book.description}</p>}
//             {book.price && <p className="text-gray-800 font-semibold mb-4">Price: ${book.price}</p>}
//           </div>

//           {/* Conditional User Buttons */}
//           {user?.role === "user" && (
//             <div className="flex gap-4 mt-4">
//               <Link to="/books">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
//                   Back to Books
//                 </button>
//               </Link>

//               <button
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Order Now
//               </button>

//               <button
//                 className={`px-4 py-2 rounded-lg ${isWishlisted ? 'bg-gray-400 text-white' : 'bg-pink-600 text-white hover:bg-pink-700'} transition-colors duration-300`}
//                 onClick={handleAddToWishlist}
//                 disabled={isWishlisted}
//               >
//                 {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
//           <div className="bg-white rounded-lg p-5 w-full max-w-sm relative shadow-lg">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
//               onClick={() => setIsModalOpen(false)}
//             >
//               ✖
//             </button>
//             <h2 className="text-2xl font-bold mb-4 text-teal-600">Place Order</h2>
//             <div className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 value={user?.name || ""}
//                 disabled
//                 className="input input-bordered"
//               />
//               <input
//                 type="email"
//                 value={user?.email || ""}
//                 disabled
//                 className="input input-bordered"
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="input input-bordered"
//               />
//               <textarea
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="textarea textarea-bordered"
//               />
//               <button
//                 onClick={handlePlaceOrder}
//                 className="btn btn-primary mt-2 bg-teal-500 hover:bg-teal-600 text-white"
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default BookDetails;
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const { id } = useParams(); 
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false); 
  const axiosSecure = useAxiosSecure();
  
  const fetchBook = async (bookId) => {
    try {
      const { data } = await axiosSecure.get(`/books/${bookId}`);
      setBook(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch book details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  // Place Order function
  const handlePlaceOrder = async () => {
    if (!phone || !address) return toast.error("Please fill all fields!");

    try {
      const orderData = {
        bookId: book?._id,                    
        bookTitle: book?.name || book?.bookName || book?.title,
        userEmail: user?.email,
        phone,
        address,
        status: "pending",
        paymentStatus: "unpaid",
        amount: book?.price || 0,
        date: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/orders", orderData);

      if (res.data?.message === "Order placed successfully") {
        toast.success("Order placed successfully!");
        setIsModalOpen(false);
        setPhone("");
        setAddress("");
        navigate("/dashboard/my-orders");
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    if (!user) return toast.error("Please login first!");

    try {
      const res = await axiosSecure.post("/wishlist/add", {
        userId: user?.uid,
        bookId: book?._id,
        bookName: book.name || book.title,
        bookAuthor: book.author || book.bookAuthor,
      });

      if (res.data.success) {
        toast.success("Book added to your wishlist!");
        setIsWishlisted(true);
        navigate("/dashboard/my-wishlist");
      } else {
        toast.error(res.data.message || "Failed to add to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading book details...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!book) return <div className="text-center mt-10">Book not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Book Overview */}
      <div className="flex flex-col md:flex-row gap-6 shadow-xl p-6 rounded-2xl bg-gradient-to-r from-teal-100 via-white to-teal-100">
        <div className="flex flex-col gap-4 md:w-1/3">
          {/* Main Cover Image */}
          <img
            src={book.cover || "/default-book.png"}           
            alt={book.name || book.title}
            className="w-full h-80 object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          {/* Additional Images (if applicable) */}
          {book.images && book.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {book.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Additional ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-teal-700">{book.name || book.title}</h1>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Author:</span> {book.author || book.bookAuthor}
            </p>
            {book.description && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-teal-600">Description / Overview</h2>
                <p className="text-gray-600">{book.description}</p>
              </div>
            )}
            {book.price && <p className="text-gray-800 font-semibold mb-4">Price: ${book.price}</p>}

            {/* Key Information / Specifications */}
            {book.specifications && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-teal-600">Key Information / Specifications</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {Object.entries(book.specifications).map(([key, value], idx) => (
                    <li key={idx}><span className="font-semibold">{key}:</span> {value}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews / Ratings */}
            {book.reviews && book.reviews.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-teal-600">Reviews / Ratings</h2>
                {book.reviews.map((rev, idx) => (
                  <div key={idx} className="border-b border-gray-200 py-2">
                    <p className="font-semibold">{rev.userName}</p>
                    <p>Rating: {rev.rating} / 5</p>
                    <p>{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Related Items */}
            {book.related && book.related.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-teal-600">Related Items</h2>
                <div className="flex gap-4 overflow-x-auto">
                  {book.related.map((rel, idx) => (
                    <Link key={idx} to={`/books/${rel._id}`} className="w-32 flex-shrink-0">
                      <img
                        src={rel.cover || "/default-book.png"}
                        alt={rel.name}
                        className="w-full h-40 object-cover rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-700 mt-1">{rel.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Conditional User Buttons */}
          {user?.role === "user" && (
            <div className="flex gap-4 mt-4 flex-wrap">
              <Link to="/books">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Back to Books
                </button>
              </Link>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                Order Now
              </button>

              <button
                className={`px-4 py-2 rounded-lg ${isWishlisted ? 'bg-gray-400 text-white' : 'bg-pink-600 text-white hover:bg-pink-700'} transition-colors duration-300`}
                onClick={handleAddToWishlist}
                disabled={isWishlisted}
              >
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-sm relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Place Order</h2>
            <div className="flex flex-col gap-3">
              <input type="text" value={user?.name || ""} disabled className="input input-bordered" />
              <input type="email" value={user?.email || ""} disabled className="input input-bordered" />
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-bordered" />
              <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="textarea textarea-bordered" />
              <button onClick={handlePlaceOrder} className="btn btn-primary mt-2 bg-teal-500 hover:bg-teal-600 text-white">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default BookDetails;
