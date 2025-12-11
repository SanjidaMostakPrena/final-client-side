import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { data: book, isLoading, isError, error } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/custom/${id}`);
      return res.data;
    },
  });

  const handlePlaceOrder = async () => {
    if (!phone || !address) return alert("Please fill all fields!");

    const orderData = {
      bookId: book.id,
      bookTitle: book.bookName,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      phone,
      address,
      status: "pending",
      paymentStatus: "unpaid",
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);
      if (res.data.insertedId) {
        alert("Order placed successfully!");
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (isLoading) return <p className="p-5">Loading book details...</p>;
  if (isError) return <p className="p-5 text-red-500">{error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">{book.bookName}</h1>
      <p className="text-gray-600 mb-2">Author: {book.bookAuthor}</p>
      <p className="text-gray-500 mb-4">{book.description}</p>

      <h2 className="text-xl font-semibold mb-2">Place Order</h2>
      <div className="flex flex-col gap-3 max-w-md">
        <input type="text" value={user.name} disabled className="input input-bordered" />
        <input type="email" value={user.email} disabled className="input input-bordered" />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered"
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="textarea textarea-bordered"
        />
        <button onClick={handlePlaceOrder} className="btn btn-primary mt-2">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
