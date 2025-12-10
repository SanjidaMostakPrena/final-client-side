import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Reviews/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import AddBook from "../Pages/Home/Shared/AddBook/AddBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "Coverage",
        Component: Coverage,
        loader: () => fetch("/public/ServiceCenters.json").then(res => res.json())
      },
      {
        path: "books",
        Component: AllBooks,
        loader: async () => {
          const res = await fetch("http://localhost:3000/books");
          if (!res.ok) throw new Response("Failed to fetch books", { status: res.status });
          return res.json();
        }
      },
      {
        path: "books/:id",
        Component: BookDetails,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/books/${params.id}`);
          if (!res.ok) throw new Response("Failed to fetch book", { status: res.status });
          return res.json();
        }
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      {
        path: "AddBook",
        element: <PrivateRoute><AddBook/></PrivateRoute>
      }
    ]
  }
]);
