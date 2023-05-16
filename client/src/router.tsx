import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { Register } from "./login/Register";
import { AdminPage } from "./pages/AdminPage";
import { Chat } from "./pages/Chat";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
