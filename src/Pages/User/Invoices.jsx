import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all paid invoices for the logged-in user
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading invoices...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Invoices</h2>

      {payments.length === 0 ? (
        <p>You have no paid invoices.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>#</th>
                <th>Payment ID</th>
                <th>Book Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>

                  {/* Payment ID */}
                  <td className="font-mono">{payment._id}</td>

                  {/* Optional: Book name */}
                  <td>{payment.bookTitle || "N/A"}</td>

                  {/* Amount */}
                  <td>{payment.amount} BDT</td>

                  {/* Date */}
                  <td>
                    {payment.date
                      ? new Date(payment.date).toLocaleDateString()
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
