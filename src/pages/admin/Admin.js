import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import LoginAdmin from "./LoginAdmin";

export default function Admin() {
  const auth = useSelector((state) => state.adminAuth.authorized);
  return <>{auth ? <Dashboard></Dashboard> : <LoginAdmin></LoginAdmin>}</>;
}
