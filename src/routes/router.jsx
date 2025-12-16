
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Reviews/Coverage/Coverage";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import MyProfile from "../Pages/Admin/MyProfile";
import MyOrders from "../Pages/User/MyOrders";
import Payment from "../Pages/User/Payment";
import Invoices from "../Pages/User/Invoices";
import AllUsers from "../Pages/Admin/AllUsers";
import ManageBooks from "../Pages/Admin/ManageBooks";
import PrivateRoute from "./PrivateRoute";
import MyBook from "../Pages/Laibrarian/MyBook";
import Order from "../Pages/Laibrarian/Order";
import AddBook from "../Pages/Laibrarian/AddBook";
export const router = createBrowserRouter([
 
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "coverage", element: <Coverage /> },
      {
        path: "books",
        element: <AllBooks />,
        loader: async () => {
  const res = await fetch("http://localhost:5000/books"); 
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();


        },
      },
    { path: "books/:id", element: <BookDetails /> },

      {
      path: "add-book",
      element: (
        <PrivateRoute>
          <AddBook />
        </PrivateRoute>
      ),
    },
    ],
  },


  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [

      { path: "all-users", element: <AllUsers /> },
      { path: "manage-books", element: <ManageBooks /> },
      { path: "my-profile", element: <MyProfile /> },





      { path: "my-book", element: <MyBook /> },
      { path: "order", element: <Order /> },







      
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "invoices", element: <Invoices /> },
      { path: "payment/:id", element: <Payment /> },
    ],
  },

  { path: "*", element: <Navigate to="/" /> },
]);
