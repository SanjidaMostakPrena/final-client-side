import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myBooks = [], refetch } = useQuery({
    queryKey: ["myBooks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian/books/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Books ({myBooks.length})</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {myBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.bookName}</td>
                <td>{book.bookAuthor}</td>
                <td>${book.price}</td>
                <td>{book.status}</td>
                <td>
                  <img src={book.bookImage} alt={book.bookName} className="w-16 h-16 object-cover"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBook;
