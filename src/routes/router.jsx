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
import DashboardLayout from '../Layout/DashboardLayout';
import MyBook from '../Pages/Dashboard/MyBook';
import MyOrders from '../Pages/Dashboard/MyOrders'; // new page
import PrivateRoute from './PrivateRoute';

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
        path: 'books',
        element: <AllBooks />,
        loader: async () => {
          const res = await fetch('http://localhost:3000/books');
          if (!res.ok) throw new Response('Failed to fetch books', { status: res.status });
          return res.json();
        },
      },
      {
        path: 'books/:id',
        element: <BookDetails />,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/books/${params.id}`);
          if (!res.ok) throw new Response('Failed to fetch book', { status: res.status });
          return res.json();
        },
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
      { path: 'my-orders', element: <MyOrders /> }, // added route for My Orders
    ],
  },
]);
