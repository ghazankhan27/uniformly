import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Profile from "../pages/login/Profile";
import About from "../pages/About";
import Admin from "../pages/admin/Admin";
import NoRoute from "../pages/404/NoRoute";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home></Home>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Route>
      <Route path="*" element={<NoRoute></NoRoute>}></Route>
    </Routes>
  );
}
