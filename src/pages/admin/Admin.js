import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/slices/AdminAuthSlice";
import Dashboard from "./Dashboard";
import LoginAdmin from "./LoginAdmin";

export default function Admin() {
  const auth = useSelector((state) => state.adminAuth.authorized);
  const dispatch = useDispatch();

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) return;

    if (admin === "true") {
      dispatch(setAuth(true));
    }
  }, []);

  return <>{auth ? <Dashboard></Dashboard> : <LoginAdmin></LoginAdmin>}</>;
}
