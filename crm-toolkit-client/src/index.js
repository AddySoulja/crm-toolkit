import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import ProtectedRoute from "./components/private/ProtectedRoute";
import Profile from "./components/user/Profile";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Dashboard from "./components/dashboard/Dashboard";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/" index={true} element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
