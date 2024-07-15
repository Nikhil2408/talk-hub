import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./App.jsx";
import AuthContextProvider from "../context/AuthContext.jsx";
import UserContextProvider from "../context/UserContext.jsx";
import SocketContextProvider from "../context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <AuthContextProvider>
        <SocketContextProvider>
          <RouterProvider router={appRouter} />
        </SocketContextProvider>
      </AuthContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
