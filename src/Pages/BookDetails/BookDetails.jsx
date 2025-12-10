import React, { useState, useContext } from "react";
import { useLoaderData, useRouteError } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  const error = useRouteError();
  if (error) {
    return <div className="text-red-600 text-center mt-10">{error.statusText || error.data || "Book not found"}</div>;
  }

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOrder = async () => {
    const orderData = {
      ...formData,
      bookId: book._id,
      bookTitle: book.title,
      status: "pending",
      paymentStatus: "unpaid",
    };

    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("Order placed successfully!");
      setShowModal(false);
    } else {
      alert("Failed to place order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={book.image} alt={book.title} className="w-full md:w-1/2 h-96 object-cover rounded-lg" />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="text-gray-600 mb-2">Author: {book.author}</p>
          <p className="text-gray-500 mb-4">{book.description}</p>
          <button onClick={() => setShowModal(true)} className="py-2 px-6 bg-green-600 text-white rounded-lg">Order Now</button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
            <h2 className="text-2xl font-bold mb-4">Place Order</h2>
            <input type="text" name="name" value={formData.name} readOnly className="w-full mb-2 p-2 border rounded" />
            <input type="email" name="email" value={formData.email} readOnly className="w-full mb-2 p-2 border rounded" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
            <button onClick={handleOrder} className="w-full py-2 bg-blue-600 text-white rounded-lg">Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
