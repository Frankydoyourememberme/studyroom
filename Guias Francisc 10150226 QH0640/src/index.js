import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Layout from "./components/Layout";
import AvailableRooms from "./components/AvailableRooms";
import BookRoom from "./components/BookRoom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/admin/dashboard";
import SignOut from "./components/SignOut";
import IsUserAdmin from "./utils/isUserAdmin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-rooms",
        element: <AvailableRooms />,
      },
      {
        path: "/book-room",
        element: <BookRoom />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  ,
  {
    path: "/admin",
    element: <IsUserAdmin />,
  },
  {
    path: "/logout",
    element: <SignOut />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
