import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import App from "../App";
import Profile from "../pages/login/Profile";
import About from "../pages/about/About";
import Admin from "../pages/admin/Admin";
import NoRoute from "../pages/404/NoRoute";
import Home from "../pages/home/Home";
import University from "../pages/university";

export default function HomeRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home></Home>}></Route>
        <Route path="/university/:id" element={<University />}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Route>
      <Route path="*" element={<NoRoute></NoRoute>}></Route>
    </Routes>
  );
}
