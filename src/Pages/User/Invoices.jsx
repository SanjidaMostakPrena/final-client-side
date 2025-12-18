import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-20 text-lg text-indigo-900">
        Loading invoices...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-indigo-50 via-white to-teal-50 rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-indigo-900">
        My Invoices
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You have no paid invoices.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-indigo-100 rounded-xl shadow-md bg-white">
            <thead className="bg-gradient-to-r from-teal-200 to-indigo-200 text-indigo-900">
              <tr>
                <th>#</th>
                <th>Payment ID</th>
                <th>Book Title</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-indigo-50 transition-colors duration-300 cursor-pointer"
                >
                  <td>{index + 1}</td>
                  <td className="font-mono text-sm text-gray-700">{payment._id}</td>
                  <td className="font-medium text-indigo-900">{payment.bookTitle || "N/A"}</td>
                  <td className="text-teal-700 font-semibold">
                    {Number(payment.amount || payment.totalAmount || 0).toFixed(2)} BDT
                  </td>
                  <td className="text-gray-600">
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString()
                      : "N/A"}
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

export default Invoices;
