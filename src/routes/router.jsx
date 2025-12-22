import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home/Home";

import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import MyProfile from "../Pages/Admin/MyProfile";
import MyOrders from "../Pages/User/MyOrders";

import Invoices from "../Pages/User/Invoices";
import AllUsers from "../Pages/Admin/AllUsers";
import ManageBooks from "../Pages/Admin/ManageBooks";

import Order from "../Pages/Laibrarian/LibrarianOrders";
import AddBook from "../Pages/Laibrarian/AddBook";
import EditBook from "../Pages/Laibrarian/EditBook";
import AboutUs from "../Pages/AboutUs/AboutUs";
import MyWishlist from "../Pages/MyWishlist/MyWishlist";
import Dashboard from "../Pages/Dashboard/Dashboard";
import LibrarianOrders from "../Pages/Laibrarian/LibrarianOrders";
import PaymentSuccess from "../Pages/User/PaymentSucces";
import Coverage from "../Pages/Home/Reviews/Coverage/Coverage";
import MyBook from "../Pages/Laibrarian/MyBook";
import PrivateRoute from "../routes/PrivateRoute";
import ErrorPage from "../Pages/Error/ErrorPage";

export const router = createBrowserRouter([
 
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
     {
  path: "coverage",
  element: <Coverage />
},


      {
        path: "/about",          
        element: <AboutUs/> 
      },
      {
        path: "books",
        element: <AllBooks />,
        loader: async () => {
  const res = await fetch(" http://localhost:5000/books"); 
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();


        },
      },
    { path: "books/:id", element: <BookDetails /> },
    { path: "register", element: <Register /> },
     { path: "MyWishlist", element:<MyWishlist></MyWishlist>},
     

     
  
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
       {path:"/dashboard" ,element:<Dashboard/>} ,
    { path: "add-book", element: <AddBook /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "manage-books", element: <ManageBooks /> },
      { path: "my-profile", element: <MyProfile /> },
  { path: "librarian-orders", element: <LibrarianOrders/> },


{ path: "my-wishlist", element: <MyWishlist /> },

      { path: "my-book", element: <MyBook/> },
      

      { path: "edit-book/:id", element: <EditBook/> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "invoices", element: <Invoices /> },
      { path: "payment-success", element: <PaymentSuccess></PaymentSuccess>},
 
      
 


    ],
  },

  { path: "*", element: <ErrorPage /> 
 },
]);