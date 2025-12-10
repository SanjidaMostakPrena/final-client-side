import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const MyBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: addbook = [], } = useQuery({
    queryKey: ["mybook", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/addbook?email=${user.email}`);
      return res.data;
    },
  });



  return (
    <div>
      All books: {addbook.length}
    </div>
  );
};

export default MyBook;
