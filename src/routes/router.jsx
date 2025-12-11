import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layout/RootLayout';
import Home from '../Pages/Home/Home/Home';
import Coverage from '../Pages/Home/Reviews/Coverage/Coverage';
import AuthLayout from '../Layout/AuthLayout';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import AllBooks from '../Pages/AllBooks/AllBooks';
import BookDetails from '../Pages/BookDetails/BookDetails';
import AddBook from '../Pages/Home/Shared/AddBook/AddBook';
import PrivateRoute from './PrivateRoute';
import Invoices from '../Pages/Dashboard/Invoices';
import MyProfile from '../Pages/Dashboard/MyProfile';
import MyBook from '../Pages/Dashboard/MyBook';
import DashboardLayout from '../Layout/DashboardLayout';
import Payment from '../Pages/Dashboard/Payment';
import MyOrders from '../Pages/Dashboard/MyOrders';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'coverage',
        element: <Coverage />,
        loader: () => fetch('/public/ServiceCenters.json').then(res => res.json()),
      },
       {
    path: "/books",
    element: <AllBooks />,
    loader: async () => {
      const res = await fetch("http://localhost:3000/books");
      return res.json();
    },
  },
  {
    path: "/books/:id",
    element: <BookDetails />,
  },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'add-book',
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'my-book', element: <MyBook /> },
      { path: 'my-orders', element: <MyOrders/> },
      { path: "payment/:id", element: <Payment /> },
      { path: 'my-profile', element: <MyProfile></MyProfile> },
      { path: 'invoices', element: <Invoices /> }// added route for My Orders
    ],
  },
]);
